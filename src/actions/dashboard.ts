"use server";

import { checkUser } from "@/lib/checkUser";
import { AccountType } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAccountParams {
  name: string;
  type: AccountType;
  balance: string;
  isDefault: boolean;
}

export const createAccount = async (data: CreateAccountParams) => {
  try {
    const user = await checkUser();

    if (!user) {
      throw new Error("User not found");
    }

    const balanceFloat = parseFloat(data.balance);

    if (isNaN(balanceFloat) || balanceFloat < 0) {
      throw new Error("Invalid balance amount");
    }

    const existingAccounts = await prisma.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await prisma.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const newAccount = await prisma.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = {
      ...newAccount,
      balance: newAccount.balance.toNumber(),
    };

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserAccounts = async () => {
  try {
    const user = await checkUser();

    if (!user) {
      throw new Error("User not found");
    }

    const accounts = await prisma.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    return accounts.map((account) => ({
      ...account,
      balance: account.balance.toNumber(),
    }));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getDashboardData = async () => {
  try {
    const user = await checkUser();

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    const serializedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toNumber(),
    }));

    return serializedTransactions;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
