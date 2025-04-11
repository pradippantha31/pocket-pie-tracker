import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart4,
  PlusCircle,
  Settings,
  LogOut,
  Users,
  CircleDollarSign,
  CreditCard,
  FileBarChart2,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error("Unable to access localStorage:", error);
      // Set default user data when localStorage is unavailable
      setUser({ name: "User", email: "user@example.com", role: "user" });
    }
  }, []);

  const handleLogout = () => {
    try {
      // Clear auth in localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Unable to access localStorage:", error);
      toast({
        title: "Error",
        description: "Unable to complete logout process.",
        variant: "destructive",
      });
    }
    
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="h-screen flex">
      <Sidebar className="border-r">
        <SidebarHeader className="px-6 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">FT</span>
            </div>
            <span className="font-bold text-xl">FinTracker</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link to="/dashboard" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/income")}>
                <Link to="/income" className="flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  <span>Income</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/expenses")}>
                <Link to="/expenses" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Expenses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/reports")}>
                <Link to="/reports" className="flex items-center">
                  <BarChart4 className="mr-2 h-4 w-4" />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/groups")}>
                <Link to="/groups" className="flex items-center">
                  <Users2 className="mr-2 h-4 w-4" />
                  <span>Group Expenses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/add")}>
                <Link to="/add" className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Add Transaction</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin && (
              <>
                <SidebarMenuItem className="mt-4">
                  <div className="pl-4 mb-2 text-xs font-semibold text-muted-foreground">ADMIN</div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
                    <Link to="/admin/users" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>User Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/reports")}>
                    <Link to="/admin/reports" className="flex items-center">
                      <FileBarChart2 className="mr-2 h-4 w-4" />
                      <span>Admin Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium leading-none truncate">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings" className="flex items-center justify-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="fixed right-4 top-4 z-50 md:hidden" />
    </div>
  );
}
