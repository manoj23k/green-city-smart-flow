import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Recycle, Leaf, Lightbulb } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/awareness")({
  head: () => ({ meta: [{ title: "Awareness — Smart Waste Management" }] }),
  component: Awareness,
});

const TIPS = [
  { icon: Recycle, title: "Segregate at source", body: "Separate dry, wet and hazardous waste in 3 different bins." },
  { icon: Leaf, title: "Compost bio-waste", body: "Convert kitchen scraps into rich compost for plants." },
  { icon: Lightbulb, title: "Reuse before recycling", body: "Glass jars, cloth bags and containers can be reused." },
  { icon: Sparkles, title: "Refuse single-use plastics", body: "Carry your own bag and refuse plastic cutlery." },
];

function Awareness() {
  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Clean City Awareness" back="/user" />
          <div className="px-5 py-5 space-y-3">
            <div className="bg-gradient-card rounded-2xl p-5 border border-primary/20 shadow-soft">
              <Sparkles className="h-6 w-6 text-primary" />
              <p className="mt-2 font-bold">Plastic-Free July Campaign</p>
              <p className="text-xs text-muted-foreground mt-1">Join 12,400+ citizens reducing single-use plastic this month.</p>
            </div>

            {TIPS.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft flex gap-3">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <t.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </RoleGate>
  );
}
