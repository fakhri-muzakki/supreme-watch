import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Clock3 } from "lucide-react";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden lg:flex flex-col justify-between border-r border-border bg-muted/20 p-12">
          <div className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] uppercase text-foreground">
            <Clock3 className="h-4 w-4" />
            Supreme Watch
          </div>

          <div className="max-w-xl space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
              Precision & Presence
            </p>
            <h1 className="text-6xl font-semibold leading-tight tracking-tight">
              Time defines your statement.
            </h1>
            <p className="max-w-lg text-base leading-8 text-muted-foreground">
              Discover premium watches crafted for modern elegance. Sign in to
              access your account, orders, and curated collections.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-background p-4 text-sm shadow-sm">
              Luxury Design
            </div>
            <div className="rounded-2xl border border-border bg-background p-4 text-sm shadow-sm">
              Secure Checkout
            </div>
            <div className="rounded-2xl border border-border bg-background p-4 text-sm shadow-sm">
              Fast Delivery
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <Card className="w-full max-w-md rounded-3xl border-border shadow-sm">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/40">
                <Clock3 className="h-5 w-5" />
              </div>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                Member Sign In
              </CardTitle>
              <CardDescription>
                Access your Supreme Watch account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
