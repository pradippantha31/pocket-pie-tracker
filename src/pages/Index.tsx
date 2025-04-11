import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const isAuthenticated = (() => {
    try {
      return localStorage.getItem("isAuthenticated") === "true";
    } catch (error) {
      console.error("Unable to access localStorage:", error);
      return false;
    }
  })();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-50 to-purple-100 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">ET</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Track Your <span className="text-primary">Finances</span> With Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple yet powerful expense tracker to help you manage personal and group finances, visualize spending patterns, and achieve your financial goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/login")}>
            Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
            Create Account
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9a4 4 0 0 1-1.93 1.1c-.58.06-1.35.06-1.58-.02-.67-.23-1.04-1.06-1.06-2.5 0-.83.4-2.02 1.03-3.76.11-.29.22-.6.35-.92"/><path d="M18 5.03v9.95"/><circle cx="18" cy="4.03" r="1"/><circle cx="18" cy="18" r="1"/><path d="M15.91 7.03c-.54 0-1.01-.05-1.44-.16-1.15-.29-2.16-1.08-3.13-1.63a10.99 10.99 0 0 0-2.17-.77c-1.89-.38-4.26.11-5.17 2.63"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Your Expenses</h3>
            <p className="text-gray-600">
              Add and categorize your expenses and income to understand where your money goes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9"/><path d="M21 12a9 9 0 0 1-9 9"/><path d="M7.8 4.8a9 9 0 0 0-3 3"/><path d="M19.2 16.2a9 9 0 0 0-3 3"/><path d="M12 12h.01"/><path d="M7 12.5V12a5 5 0 0 1 5-5h.5"/><path d="M17 12a5 5 0 0 0-5-5"/><path d="M11.5 17H12a5 5 0 0 0 5-5v-.5"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Split Group Expenses</h3>
            <p className="text-gray-600">
              Track shared expenses for activities with friends and see who owes whom.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4"/><path d="M20 12h-4"/><path d="M12 18v4"/><path d="M4 12H0"/><path d="M3.5 3.5l3 3"/><path d="M17.5 17.5l3 3"/><path d="M17.5 3.5l-3 3"/><path d="M3.5 17.5l3-3"/><circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Visual Reports</h3>
            <p className="text-gray-600">
              Analyze your spending patterns with beautiful charts and comprehensive reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
