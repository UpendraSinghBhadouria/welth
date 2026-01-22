export const dynamic = "force-dynamic";

import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transation";
import AddTransactionForm from "@/components/AddTransactionForm";
import type { Metadata } from "next";
import { cache } from "react";

const getCachedTransaction = cache(async (id: string) => {
  return getTransaction(id);
});

type PageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const editId = (await searchParams)?.edit;

  // Default: Add Transaction
  if (!editId) {
    return {
      title: "Add Transaction",
      description:
        "Add a new transaction to track your income or expenses in Welth.",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
      alternates: {
        canonical: "/transaction/add",
      },
      category: "finance",
    };
  }

  // Edit Transaction
  const transaction = await getCachedTransaction(editId);

  if (!transaction) {
    return {
      title: "Transaction Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: "Edit Transaction",
    description:
      "Edit an existing transaction to keep your financial records accurate in Welth.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/transaction/add?edit=${editId}`,
    },
    category: "finance",
  };
}

const AddTransactionPage = async ({ searchParams }: PageProps) => {
  const accounts = await getUserAccounts();
  const editId = (await searchParams)?.edit;

  let initialData: Awaited<ReturnType<typeof getTransaction>> | null = null;
  if (editId) {
    const transaction = await getCachedTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">
          {editId ? "Edit" : "Add"} Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
