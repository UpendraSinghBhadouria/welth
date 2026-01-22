"use server";

import { checkUser } from "@/lib/checkUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateDefaultAccount = async (accountId: string) => {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const updatedAccount = await prisma.account.update({
      where: { id: accountId, userId: user.id },
      data: { isDefault: true },
    });

    const serializedAccount = {
      ...updatedAccount,
      balance: updatedAccount.balance.toNumber(),
    };

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAccountWithTransactions = async (accountId: string) => {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not found");
    }

    const account = await prisma.account.findFirst({
      where: { id: accountId, userId: user.id },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    const serializedAccount = {
      ...account,
      balance: account.balance.toNumber(),
      transactions: account.transactions.map((tx) => ({
        ...tx,
        amount: tx.amount.toNumber(),
      })),
    };

    return { success: true, data: serializedAccount };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export async function bulkDeleteTransactions(transactionIds: string[]) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not found");
    }

    // Get transactions to calculate balance changes
    const transactions = await prisma.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce<Record<string, number>>(
      (acc, transaction) => {
        const change =
          transaction.type === "EXPENSE"
            ? transaction.amount
            : -transaction.amount;
        acc[transaction.accountId] =
          (acc[transaction.accountId] || 0) +
          (typeof change === "number" ? change : change.toNumber());
        return acc;
      },
      {}
    );

    // Delete transactions and update account balances in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]", "page");

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
