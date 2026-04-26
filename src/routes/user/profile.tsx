import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Award, FileText, Truck, AlertTriangle, LogOut, ChevronRight, Mail } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";
import { logout } from "@/lib/auth";

export const Route = createFileRoute("/user/profile")({
  head: () => ({ meta: [{ title: "Profile — Smart Waste Management" }] }),
  component: Profile,
});

const ROWS = [
  { icon: FileText, label: "My Reports", value: "12" },
  { icon: Truck, label: "Pickup History", value: "8" },
  { icon: AlertTriangle, label: "Complaints", value: "2" },
  { icon: Award, label: "Reward Points", value: "1,250" },
];

function Profile() {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };
  return (
    <RoleGate role="user">
      {(user) => (
        <>
          <TopBar title="Profile" back="/user" />
          <div className="px-5 py-5 space-y-4">
            <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-border/60 flex items-center gap-4">
              <div className="h-16 w-16 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold shadow-soft">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                  <Mail className="h-3 w-3" /> {user.email}
                </p>
                <span className="inline-block mt-1.5 text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Eco Citizen · Gold
                </span>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
              {ROWS.map((r, i) => (
                <button
                  key={r.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-smooth ${
                    i < ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="h-9 w-9 grid place-items-center rounded-lg bg-accent text-primary">
                    <r.icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">{r.label}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{r.value}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
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
