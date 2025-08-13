import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-base-content">Crie sua conta</h1>
          <p className="text-base-content/70 mt-2">
            Preencha seus dados para começar
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}