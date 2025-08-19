import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
        </div>
        <SignupForm />
      </div>
    </div>
  )
}