
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-04-10",
    name: "Salary",
    amount: 3500,
    type: "income",
    category: "Salary",
  },
  {
    id: "2",
    date: "2023-04-09",
    name: "Groceries",
    amount: 120.5,
    type: "expense",
    category: "Food",
  },
  {
    id: "3",
    date: "2023-04-08",
    name: "Freelance Work",
    amount: 400,
    type: "income",
    category: "Freelance",
  },
  {
    id: "4",
    date: "2023-04-07",
    name: "Restaurant",
    amount: 65.8,
    type: "expense",
    category: "Dining",
  },
  {
    id: "5",
    date: "2023-04-06",
    name: "Electric Bill",
    amount: 85.2,
    type: "expense",
    category: "Utilities",
  },
];

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="h-8"
            >
              <ArrowDownUp className="mr-2 h-3.5 w-3.5" />
              All
            </Button>
            <Button
              variant={filter === "income" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("income")}
              className="h-8"
            >
              <ArrowUpRight className="mr-2 h-3.5 w-3.5" />
              Income
            </Button>
            <Button
              variant={filter === "expense" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("expense")}
              className="h-8"
            >
              <ArrowDownRight className="mr-2 h-3.5 w-3.5" />
              Expenses
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No transactions found.
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center">
                  <div
                    className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
