import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUser, type Role, type AuthUser } from "@/lib/auth";
import { AppShell } from "./AppShell";
import { BottomNav } from "./BottomNav";

export function RoleGate({ role, children }: { role: Role; children: (user: AuthUser) => ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    window.addEventListener("swm-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("swm-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else if (user.role !== role) navigate({ to: "/login" });
  }, [user, role, navigate]);

  if (!user || user.role !== role) {
    return (
      <AppShell>
        <div className="grid place-items-center min-h-[60vh] text-muted-foreground text-sm">
          Redirecting…
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col min-h-dvh">
        <div className="flex-1 pb-2">{children(user)}</div>
        <BottomNav role={role} />
      </div>
    </AppShell>
  );
}
