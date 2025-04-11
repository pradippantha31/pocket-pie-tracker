
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Expenses Tracker</h1>
          <p className="text-gray-600 mt-2">Manage your finances with ease</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
