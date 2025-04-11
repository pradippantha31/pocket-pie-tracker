
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowDownRight, CalendarIcon, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExpenseCategoryChart } from "@/components/dashboard/ExpenseCategoryChart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Expense {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  description: string;
  category: string;
}

const dummyExpenses: Expense[] = [
  {
    id: "1",
    date: "2023-04-03",
    merchant: "Grocery Store",
    amount: 85.4,
    description: "Weekly groceries",
    category: "Food",
  },
  {
    id: "2",
    date: "2023-04-05",
    merchant: "Rent",
    amount: 1200,
    description: "Monthly apartment rent",
    category: "Rent",
  },
  {
    id: "3",
    date: "2023-04-10",
    merchant: "Electric Company",
    amount: 75.3,
    description: "Monthly electricity bill",
    category: "Utilities",
  },
  {
    id: "4",
    date: "2023-04-15",
    merchant: "Movie Theater",
    amount: 35.5,
    description: "Movie tickets and snacks",
    category: "Entertainment",
  },
  {
    id: "5",
    date: "2023-04-18",
    merchant: "Gas Station",
    amount: 45.8,
    description: "Car fuel",
    category: "Transport",
  },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<string>("");

  const filteredExpenses = expenses.filter((expense) => {
    const dateMatch = date ? expense.date === format(date, "yyyy-MM-dd") : true;
    const categoryMatch = category ? expense.category === category : true;
    return dateMatch && categoryMatch;
  });

  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const resetFilters = () => {
    setDate(undefined);
    setCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Track and manage your expenses.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Overview</CardTitle>
            <CardDescription>Your total expenses: {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalExpense)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <Label>Date Filter</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="mt-auto">
                <Filter className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No expense entries found.
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between border-b py-3 last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <ArrowDownRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.merchant}</p>
                          <p className="text-xs text-muted-foreground">
                            {expense.category} • {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{expense.description}</p>
                    </div>
                    <p className="font-semibold text-red-600">
                      -{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(expense.amount)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <ExpenseCategoryChart />
      </div>
    </div>
  );
}
