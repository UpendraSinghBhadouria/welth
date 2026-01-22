import "dotenv/config";
import { subDays } from "date-fns";
import {
  PrismaClient,
  TransactionStatus,
  TransactionType,
} from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Decimal } from "@prisma/client/runtime/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const ACCOUNT_ID = "e896a546-8acd-4c89-aba5-3df1602b8537";
const USER_ID = "817cb5dd-ad5b-4225-b10c-34ca8c4bf180";

const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
} as const;

function randomAmount(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function randomCategory(type: TransactionType) {
  const list = CATEGORIES[type];
  const item = list[Math.floor(Math.random() * list.length)];
  return {
    category: item.name,
    amount: randomAmount(item.range[0], item.range[1]),
  };
}

async function seedTransactions() {
  const transactions = [];
  let totalBalance = 0;

  for (let day = 90; day >= 0; day--) {
    const date = subDays(new Date(), day);
    const count = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < count; i++) {
      const type: TransactionType = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
      const { category, amount } = randomCategory(type);

      totalBalance += type === "INCOME" ? amount : -amount;

      transactions.push({
        type,
        amount: new Decimal(amount),
        description: `${
          type === "INCOME" ? "Received" : "Paid for"
        } ${category}`,
        date,
        category,
        receiptUrl: null,
        isRecurring: false,
        recurringInterval: null,
        nextRecurringDate: null,
        lastProcessed: null,
        status: TransactionStatus.COMPLETED,
        userId: USER_ID,
        accountId: ACCOUNT_ID,
        createdAt: date,
        updatedAt: date,
      });
    }
  }

  console.log(`📦 Generated ${transactions.length} transactions`);

  // 1. Clear existing data
  await prisma.transaction.deleteMany({
    where: { accountId: ACCOUNT_ID },
  });

  // 2. Insert in batches (important for Neon)
  const BATCH_SIZE = 100;

  for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
    const batch = transactions.slice(i, i + BATCH_SIZE);
    await prisma.transaction.createMany({
      data: batch,
    });
  }

  // 3. Update account balance
  await prisma.account.update({
    where: { id: ACCOUNT_ID },
    data: {
      balance: new Decimal(totalBalance),
    },
  });

  console.log(`✅ Seeded ${transactions.length} transactions`);
  console.log(`💰 Final account balance: $${totalBalance.toFixed(2)}`);
}

seedTransactions()
  .then(async () => {
    console.log("🌱 Seeding completed successfully");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seeding failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
