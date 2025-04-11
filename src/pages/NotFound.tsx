
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleGoHome = () => {
    try {
      navigate(isAuthenticated ? "/dashboard" : "/");
    } catch (error) {
      // Fallback if navigation fails
      window.location.href = isAuthenticated ? "/dashboard" : "/";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Button onClick={handleGoHome} size="lg">
        Go to Home
      </Button>
    </div>
  );
}
