import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Truck, Star, MapPin, LogOut, Mail } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";
import { logout } from "@/lib/auth";

export const Route = createFileRoute("/driver/profile")({
  head: () => ({ meta: [{ title: "Driver Profile — Smart Waste Management" }] }),
  component: DriverProfile,
});

function DriverProfile() {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };
  return (
    <RoleGate role="driver">
      {(user) => (
        <>
          <TopBar title="Profile" back="/driver" />
          <div className="px-5 py-5 space-y-4">
            <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-border/60 flex items-center gap-4">
              <div className="h-16 w-16 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{user.email}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Star className="h-3 w-3 text-warning" /> 4.8 · 412 pickups</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
                <Truck className="h-5 w-5 text-primary" />
                <p className="text-xs text-muted-foreground mt-2">Vehicle</p>
                <p className="font-semibold text-sm">MH-12-AB-4521</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
                <MapPin className="h-5 w-5 text-info" />
                <p className="text-xs text-muted-foreground mt-2">Zone</p>
                <p className="font-semibold text-sm">Sector 14 · MG</p>
              </div>
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
