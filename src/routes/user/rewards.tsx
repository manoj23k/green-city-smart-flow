import { createFileRoute } from "@tanstack/react-router";
import { Award, Gift, Recycle, Leaf, Coffee, Bus, ShoppingBag } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/rewards")({
  head: () => ({ meta: [{ title: "Reward Points — Smart Waste Management" }] }),
  component: Rewards,
});

const HISTORY = [
  { icon: Recycle, label: "Proper segregation", date: "Today", pts: 25 },
  { icon: Leaf, label: "Bio-waste reported on time", date: "Yesterday", pts: 15 },
  { icon: Recycle, label: "E-waste recycled", date: "3 days ago", pts: 50 },
  { icon: Leaf, label: "Pickup completed", date: "5 days ago", pts: 10 },
];

const REWARDS = [
  { icon: Coffee, label: "Free Coffee", cost: 200, tone: "bg-warning/15 text-warning" },
  { icon: Bus, label: "Bus Pass 1-day", cost: 500, tone: "bg-info/15 text-info" },
  { icon: ShoppingBag, label: "Eco Tote Bag", cost: 800, tone: "bg-primary/10 text-primary" },
  { icon: Gift, label: "Mystery Box", cost: 1500, tone: "bg-destructive/10 text-destructive" },
];

function Rewards() {
  return (
    <RoleGate role="user">
      {(user) => (
        <>
          <TopBar title="Reward Points" back="/user" />
          <div className="px-5 py-5 space-y-5">
            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-5 shadow-card relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <p className="text-xs text-primary-foreground/85">Total balance</p>
              <p className="text-4xl font-bold mt-1 flex items-center gap-2">
                {user.points?.toLocaleString()} <Award className="h-7 w-7" />
              </p>
              <p className="text-xs text-primary-foreground/85 mt-1">Eco Citizen · Tier Gold</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Redeem rewards</h3>
              <div className="grid grid-cols-2 gap-3">
                {REWARDS.map((r) => (
                  <div key={r.label} className="bg-card rounded-2xl p-4 shadow-soft border border-border/60">
                    <span className={`h-10 w-10 grid place-items-center rounded-xl ${r.tone}`}>
                      <r.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 font-semibold text-sm">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.cost} pts</p>
                    <button className="mt-3 w-full bg-primary text-primary-foreground rounded-lg py-1.5 text-xs font-semibold hover:bg-primary/90 transition-smooth">
                      Redeem
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Recent activity</h3>
              <div className="space-y-2">
                {HISTORY.map((h, i) => (
                  <div key={i} className="bg-card rounded-xl p-3 border border-border/60 flex items-center gap-3">
                    <div className="h-9 w-9 grid place-items-center rounded-lg bg-success/15 text-success">
                      <h.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{h.label}</p>
                      <p className="text-[11px] text-muted-foreground">{h.date}</p>
                    </div>
                    <span className="text-success font-bold text-sm">+{h.pts}</span>
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
