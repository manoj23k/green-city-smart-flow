import { createFileRoute } from "@tanstack/react-router";
import { Truck, CheckCircle2, Circle, MapPin, Phone } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/track")({
  head: () => ({ meta: [{ title: "Track Collection — Smart Waste Management" }] }),
  component: Track,
});

const STEPS = [
  { label: "Pickup Confirmed", time: "Yesterday · 8:42 PM", done: true },
  { label: "Driver Assigned", time: "Today · 7:10 AM", done: true },
  { label: "Driver En Route", time: "Today · 9:15 AM", done: true, current: true },
  { label: "Pickup Completed", time: "Pending", done: false },
];

function Track() {
  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Track Collection" subtitle="Live pickup status" back="/user" />
          <div className="px-5 py-5 space-y-5">
            {/* Map placeholder */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-success/20 via-primary/15 to-info/20 shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.72_0.18_150/0.25),transparent_50%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="h-14 w-14 mx-auto rounded-full bg-card grid place-items-center shadow-card animate-pulse-glow">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-foreground bg-card/80 backdrop-blur px-2 py-1 rounded-full inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> 1.2 km away · ETA 8 min
                  </p>
                </div>
              </div>
            </div>

            {/* Driver card */}
            <div className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/60 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">RK</div>
              <div className="flex-1">
                <p className="font-semibold">Ravi Kumar</p>
                <p className="text-xs text-muted-foreground">⭐ 4.8 · MH-12-AB-4521</p>
              </div>
              <button className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-soft">
                <Phone className="h-4 w-4" />
              </button>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
              <h3 className="font-semibold mb-3">Status Timeline</h3>
              <ol className="space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {s.done ? (
                        <CheckCircle2 className={`h-5 w-5 ${s.current ? "text-primary animate-pulse" : "text-success"}`} />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      {i < STEPS.length - 1 ? (
                        <div className={`w-px flex-1 my-1 ${s.done ? "bg-success" : "bg-border"}`} />
                      ) : null}
                    </div>
                    <div className="pb-2">
                      <p className={`text-sm font-semibold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                      <p className="text-[11px] text-muted-foreground">{s.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </RoleGate>
  );
}
