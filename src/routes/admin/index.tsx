import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Truck, AlertTriangle, Users, Trash2, Activity, MapPin } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { StatCard } from "@/components/app/StatCard";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Smart Waste Management" }] }),
  component: AdminHome,
});

const BINS = [
  { id: "B-12", area: "MG Road", level: 92, tone: "bg-destructive" },
  { id: "B-07", area: "Sector 14", level: 64, tone: "bg-warning" },
  { id: "B-22", area: "Lake View", level: 38, tone: "bg-success" },
  { id: "B-31", area: "Park Lane", level: 80, tone: "bg-warning" },
];

const COMPLAINTS = [
  { id: "C-1090", title: "Hazardous waste — Lake View", priority: "Critical", time: "5m" },
  { id: "C-1089", title: "Overflowing bin — MG Road", priority: "High", time: "12m" },
  { id: "C-1088", title: "Illegal dumping — Old Town", priority: "Normal", time: "1h" },
];

const PRIORITY: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive",
  High: "bg-warning/15 text-warning",
  Normal: "bg-info/15 text-info",
};

function AdminHome() {
  return (
    <RoleGate role="admin">
      {(user) => (
        <>
          <section className="bg-gradient-hero text-primary-foreground px-5 pt-6 pb-12 rounded-b-[2rem] relative overflow-hidden">
            <div className="absolute -right-12 top-4 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative">
              <p className="text-xs text-primary-foreground/85">Welcome back,</p>
              <h2 className="text-xl font-bold">{user.name} 🛡️</h2>
              <p className="text-xs text-primary-foreground/85 mt-1 flex items-center gap-1">
                <Activity className="h-3 w-3" /> Smart City — Live monitoring
              </p>
            </div>
          </section>

          <section className="px-5 -mt-7">
            <div className="grid grid-cols-2 gap-2.5">
              <StatCard label="Total Reports" value="248" icon={<FileText className="h-4 w-4" />} hint="+18 today" tone="primary" />
              <StatCard label="Pending Pickups" value="36" icon={<Truck className="h-4 w-4" />} hint="12 high prio" tone="warning" />
              <StatCard label="Completed" value="192" icon={<Truck className="h-4 w-4" />} hint="Today" tone="success" />
              <StatCard label="Emergencies" value="4" icon={<AlertTriangle className="h-4 w-4" />} hint="2 active" tone="destructive" />
              <StatCard label="Active Drivers" value="14/18" icon={<Users className="h-4 w-4" />} tone="info" />
              <StatCard label="Smart Bins" value="86" icon={<Trash2 className="h-4 w-4" />} hint="3 full" tone="primary" />
            </div>
          </section>

          {/* Heatmap mock */}
          <section className="px-5 mt-6">
            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Complaint Heatmap</h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Today</span>
              </div>
              <div className="relative h-36 rounded-xl bg-gradient-to-br from-success/15 via-primary/10 to-info/15 overflow-hidden">
                <div className="absolute h-16 w-16 rounded-full bg-destructive/40 blur-2xl top-4 left-8" />
                <div className="absolute h-12 w-12 rounded-full bg-warning/50 blur-2xl top-12 right-12" />
                <div className="absolute h-10 w-10 rounded-full bg-destructive/30 blur-xl bottom-4 left-1/3" />
                <div className="absolute h-14 w-14 rounded-full bg-warning/40 blur-2xl bottom-2 right-6" />
              </div>
            </div>
          </section>

          {/* Smart bins */}
          <section className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Smart Bin IoT Monitoring</h3>
              <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <div className="space-y-2">
              {BINS.map((b) => (
                <div key={b.id} className="bg-card rounded-xl p-3 border border-border/60 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">{b.id} · {b.area}</span>
                    </div>
                    <span className="text-xs font-bold tabular-nums">{b.level}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${b.tone} transition-smooth`} style={{ width: `${b.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Complaints */}
          <section className="px-5 mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent Complaints</h3>
              <Link to="/admin/reports" className="text-xs font-semibold text-primary">View all →</Link>
            </div>
            <div className="space-y-2">
              {COMPLAINTS.map((c) => (
                <div key={c.id} className="bg-card rounded-xl p-3.5 border border-border/60 shadow-soft flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{c.title}</p>
                    <p className="text-[11px] text-muted-foreground">{c.id} · {c.time} ago</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${PRIORITY[c.priority]}`}>
                    {c.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </RoleGate>
  );
}
