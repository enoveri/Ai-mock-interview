import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{
        backgroundImage: "url('/pattern.png')",
        backgroundPosition: "top",
        backgroundRepeat: "repeat",
      }}
    >
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
