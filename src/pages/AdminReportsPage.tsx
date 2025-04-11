
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { format, subDays } from "date-fns";
import { ArrowDownToLine, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const COLORS = ["#9b87f5", "#6D28D9", "#22c55e", "#ea384c", "#0EA5E9", "#F97316"];

// Mock data
const generateUserActivityData = () => {
  return [
    { name: "Registrations", value: 24 },
    { name: "Active Daily", value: 58 },
    { name: "Active Weekly", value: 132 },
    { name: "Active Monthly", value: 187 },
    { name: "Inactive", value: 45 },
  ];
};

const generateTransactionData = () => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      date: format(date, "MMM dd"),
      income: Math.floor(Math.random() * 150) + 50,
      expense: Math.floor(Math.random() * 100) + 30,
      transactions: Math.floor(Math.random() * 15) + 5,
    });
  }
  return data;
};

const generateTopUsers = () => [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    transactions: 32,
    totalAmount: 5420.75,
    lastActive: "2023-04-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    transactions: 48,
    totalAmount: 7320.50,
    lastActive: "2023-04-18",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    transactions: 27,
    totalAmount: 4150.25,
    lastActive: "2023-04-19",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    transactions: 21,
    totalAmount: 3780.40,
    lastActive: "2023-04-21",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    transactions: 19,
    totalAmount: 2950.60,
    lastActive: "2023-04-17",
  },
];

export default function AdminReportsPage() {
  const [timeFrame, setTimeFrame] = useState("month");
  const [userActivityData, setUserActivityData] = useState(generateUserActivityData());
  const [transactionData, setTransactionData] = useState(generateTransactionData());
  const [topUsers, setTopUsers] = useState(generateTopUsers());

  const userStats = {
    total: 254,
    new: 24,
    active: 187,
    growth: "10.5%",
  };

  const transactionStats = {
    total: 4586,
    income: 78250.45,
    expense: 32480.75,
    average: 171.50,
  };

  const handleExport = (format: string) => {
    alert(`Exporting data in ${format} format...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Reports</h2>
          <p className="text-muted-foreground">Comprehensive analytics and statistics.</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 365 days</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="none">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Export Report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Export as...</SelectItem>
              <SelectItem value="csv" onSelect={() => handleExport("CSV")}>CSV</SelectItem>
              <SelectItem value="pdf" onSelect={() => handleExport("PDF")}>PDF</SelectItem>
              <SelectItem value="excel" onSelect={() => handleExport("Excel")}>Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{userStats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600 font-medium">{userStats.growth} ↑</span> from last {timeFrame}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Users</p>
                <p className="text-3xl font-bold">{userStats.new}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                In the last {timeFrame}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <p className="text-3xl font-bold">{transactionStats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ArrowDownToLine className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Average {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(transactionStats.average)} per transaction
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                <p className="text-3xl font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(transactionStats.income + transactionStats.expense)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ArrowDownToLine className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                In the last {timeFrame}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Analytics</TabsTrigger>
          <TabsTrigger value="topUsers">Top Users</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Breakdown of user activity statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userActivityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userActivityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={transactionData.map((item, index) => ({
                        ...item,
                        users: Math.floor(Math.random() * 5) + (index < 15 ? 0 : 2),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        name="New Users"
                        stroke="#9b87f5"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Income and expense transactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => 
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(value))
                      }
                    />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#22c55e" />
                    <Bar dataKey="expense" name="Expense" fill="#ea384c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transactionStats.income)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transactionStats.expense)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">Net Flow</p>
                    <p className="text-2xl font-bold text-primary">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transactionStats.income - transactionStats.expense)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="topUsers">
          <Card>
            <CardHeader>
              <CardTitle>Top Users by Transaction Volume</CardTitle>
              <CardDescription>Users with the highest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.transactions}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(user.totalAmount)}
                      </TableCell>
                      <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
