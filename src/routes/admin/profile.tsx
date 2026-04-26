import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, LogOut, Mail, Award } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";
import { logout } from "@/lib/auth";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "Admin Profile — Smart Waste Management" }] }),
  component: AdminProfile,
});

function AdminProfile() {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };
  return (
    <RoleGate role="admin">
      {(user) => (
        <>
          <TopBar title="Admin Profile" back="/admin" />
          <div className="px-5 py-5 space-y-4">
            <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-border/60 flex items-center gap-4">
              <div className="h-16 w-16 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{user.email}</p>
                <span className="inline-block mt-1.5 text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Municipal Admin
                </span>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <p className="text-xs text-muted-foreground">City performance</p>
              <p className="text-2xl font-bold mt-1 flex items-center gap-2">A+ Rank <Award className="h-5 w-5 text-warning" /></p>
              <p className="text-xs text-muted-foreground mt-1">Top 10% of Smart Cities — Q3 2025</p>
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-destructive/10 text-destructive font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-destructive/15 transition-smooth"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </>
      )}
    </RoleGate>
  );
}
