
import { CreditCard, DollarSign, PiggyBank, WalletCards } from "lucide-react";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { ExpenseCategoryChart } from "@/components/dashboard/ExpenseCategoryChart";
import { IncomeCategoryChart } from "@/components/dashboard/IncomeCategoryChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Your financial overview at a glance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BalanceCard
          title="Total Balance"
          amount={5820.53}
          icon={<WalletCards className="h-4 w-4" />}
        />
        <BalanceCard
          title="Total Income"
          amount={7521.32}
          icon={<DollarSign className="h-4 w-4" />}
          className="border-green-100"
        />
        <BalanceCard
          title="Total Expenses"
          amount={1700.79}
          icon={<CreditCard className="h-4 w-4" />}
          className="border-red-100"
        />
        <BalanceCard
          title="Total Savings"
          amount={2125.15}
          icon={<PiggyBank className="h-4 w-4" />}
          className="border-blue-100"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseCategoryChart />
        <IncomeCategoryChart />
      </div>
      <TransactionsList />
    </div>
  );
}
