import { auth } from "@/auth";
import { LogInButton } from "@/components/auth/LogInButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/settings");
  }
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            font.className,
            "text-6xl font-semibold text-white drop-shadow-sm"
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">Authentication Service</p>
        <LogInButton mode="modal" asChild>
          <Button variant={"secondary"} size={"lg"} className="mt-6">
            Sign In
          </Button>
        </LogInButton>
      </div>
    </main>
  );
}
