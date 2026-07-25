import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = { title: "Sign in — Cat3 Admin" };

export default function AdminLoginPage() {
  // LoginForm reads useSearchParams(); a Suspense boundary is required for it.
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
