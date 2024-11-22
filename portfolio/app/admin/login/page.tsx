import { Metadata } from "next"
import { LoginForm } from "@/components/admin/login-form/login-form"
import { AuthTest } from "@/components/admin/auth-test/auth-test"

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Sign in to manage your portfolio</p>
        </div>
        <LoginForm />
        <div className="mt-8">
          <AuthTest />
        </div>
      </div>
    </div>
  )
} 