import Logo from "@/components/shared/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <main className="w-full max-w-md">
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AmplyAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
