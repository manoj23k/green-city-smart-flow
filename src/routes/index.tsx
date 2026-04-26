import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Recycle } from "lucide-react";
import { getCurrentUser, dashboardPathFor } from "@/lib/auth";
import { AppShell } from "@/components/app/AppShell";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Waste Management — Clean City, Green Future" },
      {
        name: "description",
        content:
          "Smart City IoT-based waste collection, segregation and pickup management for citizens, drivers and city admins.",
      },
      { property: "og:title", content: "Smart Waste Management" },
      { property: "og:description", content: "Clean City, Green Future ♻️" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      const u = getCurrentUser();
      navigate({ to: u ? dashboardPathFor(u.role) : "/login" });
    }, 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <AppShell className="bg-gradient-hero">
      <div className="relative grid place-items-center min-h-dvh text-primary-foreground overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full border-2 border-white/30 animate-spin-slow" />
          <div
            className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full border-2 border-white/20 animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          />
        </div>

        <div className="relative text-center px-6 animate-float-up">
          <div className="mx-auto h-28 w-28 grid place-items-center rounded-3xl bg-white/95 shadow-glow mb-6 animate-pulse-glow">
            <img src={logo} alt="Smart Waste Management logo" width={96} height={96} className="h-24 w-24 object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Waste Management</h1>
          <p className="mt-2 text-primary-foreground/85 text-sm flex items-center justify-center gap-1">
            Clean City, Green Future <Recycle className="h-4 w-4" />
          </p>

          <div className="mt-10 flex items-center justify-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="h-2 w-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="h-2 w-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

        <p className="absolute bottom-6 text-xs text-primary-foreground/70">v1.0 · Smart City Initiative</p>
      </div>
    </AppShell>
  );
}
