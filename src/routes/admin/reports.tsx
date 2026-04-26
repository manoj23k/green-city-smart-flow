import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, FileText, Truck, Recycle } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";
import { StatCard } from "@/components/app/StatCard";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Smart Waste Management" }] }),
  component: Reports,
});

function Reports() {
  const week = [62, 78, 55, 90, 72, 88, 95];
  const max = Math.max(...week);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <RoleGate role="admin">
      {() => (
        <>
          <TopBar title="Analytics" subtitle="Weekly performance" back="/admin" />
          <div className="px-5 py-5 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Reports / day" value="35" icon={<FileText className="h-4 w-4" />} hint="+12%" tone="primary" />
              <StatCard label="Avg pickup time" value="42m" icon={<Truck className="h-4 w-4" />} hint="−6m" tone="info" />
              <StatCard label="Recycle rate" value="78%" icon={<Recycle className="h-4 w-4" />} hint="+4%" tone="success" />
              <StatCard label="Citizen score" value="A" icon={<TrendingUp className="h-4 w-4" />} tone="success" />
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <h3 className="font-semibold">Pickups this week</h3>
              <div className="mt-4 flex items-end gap-2 h-36">
                {week.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow transition-smooth"
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{labels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <h3 className="font-semibold mb-3">Waste segregation</h3>
              <div className="space-y-2">
                {[
                  { label: "Bio-waste", pct: 48, tone: "bg-success" },
                  { label: "Solid waste", pct: 34, tone: "bg-warning" },
                  { label: "E-waste", pct: 12, tone: "bg-info" },
                  { label: "Hazardous", pct: 6, tone: "bg-destructive" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-muted-foreground tabular-nums">{r.pct}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${r.tone}`} style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </RoleGate>
  );
}
