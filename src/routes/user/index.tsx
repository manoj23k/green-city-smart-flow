import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText, CalendarClock, Truck, Bell, AlertTriangle, BarChart3, Gift, Sparkles, MapPin, Award, Recycle,
} from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";

export const Route = createFileRoute("/user/")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — Smart Waste Management" },
      { name: "description", content: "Report waste, schedule pickups, earn rewards." },
    ],
  }),
  component: UserHome,
});

const ACTIONS = [
  { to: "/user/report", label: "Report Waste", icon: FileText, tone: "bg-primary/10 text-primary" },
  { to: "/user/schedule", label: "Schedule Pickup", icon: CalendarClock, tone: "bg-info/10 text-info" },
  { to: "/user/track", label: "Track Collection", icon: Truck, tone: "bg-success/15 text-success" },
  { to: "/user/notifications", label: "Notifications", icon: Bell, tone: "bg-warning/15 text-warning" },
  { to: "/user/emergency", label: "Emergency", icon: AlertTriangle, tone: "bg-destructive/10 text-destructive" },
  { to: "/user/report-monthly", label: "Monthly Report", icon: BarChart3, tone: "bg-accent text-accent-foreground" },
  { to: "/user/rewards", label: "Reward Points", icon: Gift, tone: "bg-primary/10 text-primary" },
  { to: "/user/awareness", label: "Awareness", icon: Sparkles, tone: "bg-info/10 text-info" },
];

function UserHome() {
  return (
    <RoleGate role="user">
      {(user) => (
        <>
          {/* Hero greeting */}
          <section className="bg-gradient-hero text-primary-foreground px-5 pt-6 pb-12 rounded-b-[2rem] relative overflow-hidden">
            <div className="absolute -right-12 top-4 h-40 w-40 rounded-full bg-white/10" />
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-xs text-primary-foreground/80">Hello,</p>
                <h2 className="text-xl font-bold">{user.name} 👋</h2>
                <p className="text-xs text-primary-foreground/80 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> Sector 14, Smart City
                </p>
              </div>
              <Link
                to="/user/profile"
                className="h-12 w-12 grid place-items-center rounded-full bg-white/20 text-lg font-bold backdrop-blur"
                aria-label="Profile"
              >
                {user.name.charAt(0)}
              </Link>
            </div>

            {/* Reward strip */}
            <div className="relative mt-5 bg-white/15 backdrop-blur rounded-2xl p-3 flex items-center gap-3 border border-white/20">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-white/95 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-primary-foreground/85">Your Eco Points</p>
                <p className="text-lg font-bold">{user.points?.toLocaleString()} pts</p>
              </div>
              <Link to="/user/rewards" className="text-xs bg-white/95 text-primary font-semibold px-3 py-1.5 rounded-full">
                Redeem
              </Link>
            </div>
          </section>

          {/* Quick stats */}
          <section className="px-5 -mt-7">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Reports", value: 12, tone: "text-primary" },
                { label: "Pickups", value: 8, tone: "text-info" },
                { label: "Recycled", value: "24kg", tone: "text-success" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-2xl p-3 shadow-soft text-center border border-border/60">
                  <p className={`text-lg font-bold ${s.tone}`}>{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <section className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <Recycle className="h-4 w-4 text-primary" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {ACTIONS.map(({ to, label, icon: Icon, tone }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex flex-col items-center gap-2 group"
                >
                  <span className={`h-14 w-14 grid place-items-center rounded-2xl ${tone} group-hover:scale-105 transition-bounce shadow-soft`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[10.5px] text-center text-muted-foreground group-hover:text-foreground leading-tight">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Next pickup */}
          <section className="px-5 mt-6">
            <div className="bg-gradient-card rounded-2xl p-4 shadow-card border border-border/60">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Next Pickup</h3>
                <span className="text-[10px] font-bold uppercase bg-success/15 text-success px-2 py-0.5 rounded-full">Scheduled</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Tomorrow · 9:30 AM</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Driver Ravi K.</p>
                  <p className="text-xs text-muted-foreground">Vehicle MH-12-AB-4521</p>
                </div>
                <Link to="/user/track" className="text-xs font-semibold text-primary">Track →</Link>
              </div>
            </div>
          </section>

          {/* Awareness */}
          <section className="px-5 mt-6 mb-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Tip of the day</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Rinse plastic containers before recycling — clean recyclables are 3× more likely to be processed.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </RoleGate>
  );
}
