import { Link, useLocation } from "@tanstack/react-router";
import { Home, FileText, Bell, User, Truck, Map, ListChecks, LayoutDashboard, Users, BarChart3 } from "lucide-react";
import type { Role } from "@/lib/auth";

const NAV: Record<Role, { to: string; label: string; icon: React.ElementType }[]> = {
  user: [
    { to: "/user", label: "Home", icon: Home },
    { to: "/user/report", label: "Report", icon: FileText },
    { to: "/user/notifications", label: "Alerts", icon: Bell },
    { to: "/user/profile", label: "Profile", icon: User },
  ],
  driver: [
    { to: "/driver", label: "Tasks", icon: ListChecks },
    { to: "/driver/route", label: "Route", icon: Map },
    { to: "/driver/history", label: "History", icon: Truck },
    { to: "/driver/profile", label: "Profile", icon: User },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/drivers", label: "Drivers", icon: Users },
    { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    { to: "/admin/profile", label: "Profile", icon: User },
  ],
};

export function BottomNav({ role }: { role: Role }) {
  const loc = useLocation();
  const items = NAV[role];
  return (
    <nav className="sticky bottom-0 z-30 bg-card/95 backdrop-blur border-t border-border px-2 py-2">
      <ul className="grid grid-cols-4 gap-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to || (to !== `/${role}` && loc.pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition-smooth ${
                  active ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
