
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowUpRight, CalendarIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncomeCategoryChart } from "@/components/dashboard/IncomeCategoryChart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Income {
  id: string;
  date: string;
  source: string;
  amount: number;
  description: string;
  category: string;
}

const dummyIncomes: Income[] = [
  {
    id: "1",
    date: "2023-04-01",
    source: "Monthly Salary",
    amount: 3500,
    description: "Regular salary payment",
    category: "Salary",
  },
  {
    id: "2",
    date: "2023-04-05",
    source: "Freelance Project",
    amount: 500,
    description: "Website design for client",
    category: "Freelance",
  },
  {
    id: "3",
    date: "2023-04-10",
    source: "Dividend Payment",
    amount: 120,
    description: "Quarterly dividend from investments",
    category: "Investments",
  },
  {
    id: "4",
    date: "2023-04-15",
    source: "Apartment Rent",
    amount: 800,
    description: "Rent from tenant",
    category: "Rental",
  },
  {
    id: "5",
    date: "2023-04-20",
    source: "Online Store",
    amount: 350,
    description: "Monthly revenue from online store",
    category: "Side Business",
  },
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>(dummyIncomes);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<string>("");

  const filteredIncomes = incomes.filter((income) => {
    const dateMatch = date ? income.date === format(date, "yyyy-MM-dd") : true;
    const categoryMatch = category ? income.category === category : true;
    return dateMatch && categoryMatch;
  });

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);

  const resetFilters = () => {
    setDate(undefined);
    setCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Income</h2>
          <p className="text-muted-foreground">Track and manage your income sources.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income Overview</CardTitle>
            <CardDescription>Your total income: {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalIncome)}</CardDescription>
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
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Investments">Investments</SelectItem>
                    <SelectItem value="Rental">Rental</SelectItem>
                    <SelectItem value="Side Business">Side Business</SelectItem>
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
              {filteredIncomes.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No income entries found.
                </div>
              ) : (
                filteredIncomes.map((income) => (
                  <div
                    key={income.id}
                    className="flex items-center justify-between border-b py-3 last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{income.source}</p>
                          <p className="text-xs text-muted-foreground">
                            {income.category} • {new Date(income.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{income.description}</p>
                    </div>
                    <p className="font-semibold text-green-600">
                      +{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(income.amount)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <IncomeCategoryChart />
      </div>
    </div>
  );
}
