import { cache, Suspense } from "react";
import { BarLoader } from "react-spinners";
import { notFound } from "next/navigation";
import { getAccountWithTransactions } from "@/actions/account";
import TransactionTable from "@/components/TransactionTable";
import AccountChart from "@/components/AccountChart";
import type { Metadata } from "next";

const getCachedAccount = cache(async (id: string) => {
  return getAccountWithTransactions(id);
});

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getCachedAccount(id);

  if (!data) {
    return {
      title: "Account Not Found",
      robots: { index: false, follow: false },
    };
  }

  const accountType = data.type.charAt(0) + data.type.slice(1).toLowerCase();

  return {
    title: `${data.name} • ${accountType} Account`,
    description: `View balance and transactions for your ${data.name} account on Welth.`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/account/${id}`,
    },
  };
}

const AccountPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getCachedAccount(id);

  if (!data) {
    notFound();
  }

  const { transactions, ...account } = data;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            &#8377;{account.balance.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
