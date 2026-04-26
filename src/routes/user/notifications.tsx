import { createFileRoute } from "@tanstack/react-router";
import { Bell, Truck, CheckCircle2, AlertTriangle, Trash2, Sparkles } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Smart Waste Management" }] }),
  component: Notifications,
});

const ITEMS = [
  { icon: Truck, tone: "bg-primary/10 text-primary", title: "Pickup scheduled", body: "Tomorrow at 9:30 AM. Driver Ravi K. assigned.", time: "2h" },
  { icon: CheckCircle2, tone: "bg-success/15 text-success", title: "Report submitted", body: "Your e-waste report received. +25 eco points.", time: "5h" },
  { icon: AlertTriangle, tone: "bg-destructive/10 text-destructive", title: "Bin full near you", body: "Smart bin at MG Road is 92% full.", time: "1d" },
  { icon: Trash2, tone: "bg-warning/15 text-warning", title: "Pickup completed", body: "Yesterday's bio-waste pickup done. Thank you!", time: "1d" },
  { icon: Sparkles, tone: "bg-info/15 text-info", title: "Awareness", body: "Plastic-free July starts next week. Join the campaign!", time: "2d" },
];

function Notifications() {
  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Notifications" back="/user" />
          <div className="px-4 py-4 space-y-2">
            {ITEMS.map((n, i) => (
              <div key={i} className="bg-card rounded-2xl p-3.5 border border-border/60 shadow-soft flex gap-3 animate-float-up">
                <div className={`h-10 w-10 grid place-items-center rounded-xl ${n.tone} shrink-0`}>
                  <n.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                </div>
              </div>
            ))}
            <div className="text-center text-xs text-muted-foreground pt-4 flex items-center justify-center gap-1">
              <Bell className="h-3 w-3" /> You're all caught up
            </div>
          </div>
        </>
      )}
    </RoleGate>
  );
}
