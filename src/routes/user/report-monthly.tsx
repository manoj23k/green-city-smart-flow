import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Recycle, FileText, Truck } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";
import { StatCard } from "@/components/app/StatCard";

export const Route = createFileRoute("/user/report-monthly")({
  head: () => ({ meta: [{ title: "Monthly Report — Smart Waste Management" }] }),
  component: MonthlyReport,
});

function MonthlyReport() {
  const days = [40, 65, 50, 80, 70, 95, 60, 85, 90, 75, 88, 72];
  const max = Math.max(...days);
  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Monthly Report" subtitle="Your eco performance" back="/user" />
          <div className="px-5 py-5 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Reports" value="12" icon={<FileText className="h-4 w-4" />} hint="+3 vs last month" tone="primary" />
              <StatCard label="Pickups" value="8" icon={<Truck className="h-4 w-4" />} hint="100% on time" tone="info" />
              <StatCard label="Recycling" value="92%" icon={<Recycle className="h-4 w-4" />} hint="Excellent" tone="success" />
              <StatCard label="Segregation" value="A+" icon={<TrendingUp className="h-4 w-4" />} hint="Top 5%" tone="success" />
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Daily activity</h3>
                <span className="text-xs text-muted-foreground">Last 12 days</span>
              </div>
              <div className="mt-4 flex items-end gap-1.5 h-32">
                {days.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary-glow transition-smooth hover:opacity-80"
                    style={{ height: `${(v / max) * 100}%` }}
                    title={`${v}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-5 shadow-card">
              <p className="text-xs text-primary-foreground/85">Carbon impact</p>
              <p className="text-3xl font-bold mt-1">−24.6 kg CO₂</p>
              <p className="text-xs text-primary-foreground/85 mt-1">saved this month through proper segregation 🌱</p>
            </div>
          </div>
        </>
      )}
    </RoleGate>
  );
}
