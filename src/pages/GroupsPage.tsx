
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Users, PieChart } from "lucide-react";
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Group {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  members: Member[];
  expenses: GroupExpense[];
  date: string;
}

interface Member {
  id: string;
  name: string;
  paid: number;
  shouldPay: number;
}

interface GroupExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
}

const dummyGroups: Group[] = [
  {
    id: "1",
    name: "Hiking Trip",
    description: "Weekend hiking trip to the mountains",
    totalAmount: 435.65,
    date: "2023-05-15",
    members: [
      { id: "1", name: "John Doe", paid: 200, shouldPay: 145.22 },
      { id: "2", name: "Jane Smith", paid: 150, shouldPay: 145.22 },
      { id: "3", name: "Robert Johnson", paid: 85.65, shouldPay: 145.22 },
    ],
    expenses: [
      { id: "1", description: "Food supplies", amount: 120, paidBy: "John Doe", date: "2023-05-10" },
      { id: "2", description: "Transportation", amount: 150, paidBy: "Jane Smith", date: "2023-05-12" },
      { id: "3", description: "Equipment rental", amount: 80, paidBy: "John Doe", date: "2023-05-14" },
      { id: "4", description: "Cabin booking", amount: 85.65, paidBy: "Robert Johnson", date: "2023-05-08" },
    ],
  },
  {
    id: "2",
    name: "Birthday Party",
    description: "Sarah's surprise birthday party",
    totalAmount: 320.45,
    date: "2023-06-10",
    members: [
      { id: "1", name: "John Doe", paid: 120, shouldPay: 80.11 },
      { id: "2", name: "Jane Smith", paid: 80, shouldPay: 80.11 },
      { id: "3", name: "Robert Johnson", paid: 60.45, shouldPay: 80.11 },
      { id: "4", name: "Emily Davis", paid: 60, shouldPay: 80.11 },
    ],
    expenses: [
      { id: "1", description: "Cake and desserts", amount: 80, paidBy: "Jane Smith", date: "2023-06-08" },
      { id: "2", description: "Decorations", amount: 60, paidBy: "Emily Davis", date: "2023-06-07" },
      { id: "3", description: "Food and drinks", amount: 120, paidBy: "John Doe", date: "2023-06-09" },
      { id: "4", description: "Gift", amount: 60.45, paidBy: "Robert Johnson", date: "2023-06-05" },
    ],
  },
];

const COLORS = ["#9b87f5", "#6D28D9", "#22c55e", "#ea384c", "#0EA5E9", "#F97316"];

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(dummyGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const handleCreateGroup = () => {
    // In a real app, you'd send this to your API
    const newGroup: Group = {
      id: `${groups.length + 1}`,
      name: newGroupName,
      description: newGroupDescription,
      totalAmount: 0,
      date: new Date().toISOString().split("T")[0],
      members: [],
      expenses: [],
    };
    
    setGroups([...groups, newGroup]);
    setIsCreateDialogOpen(false);
    setNewGroupName("");
    setNewGroupDescription("");
  };

  const getExpenseData = (group: Group) => {
    return group.expenses.map((expense, index) => ({
      name: expense.description,
      value: expense.amount,
      color: COLORS[index % COLORS.length],
    }));
  };

  const getMemberData = (group: Group) => {
    return group.members.map((member, index) => ({
      name: member.name,
      value: member.paid,
      color: COLORS[index % COLORS.length],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Group Expenses</h2>
          <p className="text-muted-foreground">Track shared expenses for activities with friends.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new expense group</DialogTitle>
              <DialogDescription>
                Add a name and description for your new expense group.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  placeholder="Enter group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter group description"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(group.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(group.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Members</p>
                <div className="flex flex-wrap gap-2">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setSelectedGroup(group)}>
                <Users className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedGroup?.name}</DialogTitle>
            <DialogDescription>{selectedGroup?.description}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Expenses List</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {selectedGroup?.expenses.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Paid by {expense.paidBy} on {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(expense.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Expense Breakdown</h3>
                  <div className="h-[300px]">
                    {selectedGroup && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsChart>
                          <Pie
                            data={getExpenseData(selectedGroup)}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {getExpenseData(selectedGroup).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(value))} />
                        </RechartsChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="members" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Members List</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {selectedGroup?.members.map((member) => (
                      <div key={member.id} className="border-b pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{member.name}</p>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Paid</p>
                            <p className="font-semibold text-green-600">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(member.paid)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Should Pay</p>
                            <p className="font-semibold">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(member.shouldPay)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Contribution Breakdown</h3>
                  <div className="h-[300px]">
                    {selectedGroup && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsChart>
                          <Pie
                            data={getMemberData(selectedGroup)}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {getMemberData(selectedGroup).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(value))} />
                        </RechartsChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="summary" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      Summary
                    </CardTitle>
                    <CardDescription>Who owes whom</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedGroup?.members.map((member) => {
                        const diff = member.paid - member.shouldPay;
                        return (
                          <div key={member.id} className="border-b pb-2 last:border-0">
                            <p className="font-medium">{member.name}</p>
                            {diff > 0 ? (
                              <p className="text-sm text-green-600">
                                Should receive {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(diff)}
                              </p>
                            ) : diff < 0 ? (
                              <p className="text-sm text-red-600">
                                Should pay {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(Math.abs(diff))}
                              </p>
                            ) : (
                              <p className="text-sm text-muted-foreground">All settled</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Group Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-xl font-bold">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(selectedGroup?.totalAmount || 0)}
                          </p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Per Person</p>
                          <p className="text-xl font-bold">
                            {selectedGroup && selectedGroup.members.length > 0 ? (
                              new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(selectedGroup.totalAmount / selectedGroup.members.length)
                            ) : (
                              "$0.00"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Most Expensive Item</p>
                        {selectedGroup && selectedGroup.expenses.length > 0 ? (
                          <>
                            <p className="font-medium">
                              {selectedGroup.expenses.reduce((prev, current) => 
                                prev.amount > current.amount ? prev : current
                              ).description}
                            </p>
                            <p className="text-sm">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(selectedGroup.expenses.reduce((prev, current) => 
                                prev.amount > current.amount ? prev : current
                              ).amount)}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm">No expenses</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={() => setSelectedGroup(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
