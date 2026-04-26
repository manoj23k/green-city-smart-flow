import { createFileRoute } from "@tanstack/react-router";
import { Navigation, MapPin, Truck, Route as RouteIcon } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/driver")({
  head: () => ({ meta: [{ title: "Route — Smart Waste Management" }] }),
  component: RoutePage,
});

const STOPS = [
  { name: "Sector 14, House 22", eta: "Now", distance: "0.0 km" },
  { name: "MG Road, Bin #12", eta: "8 min", distance: "1.4 km" },
  { name: "Park Lane, Plot 5", eta: "22 min", distance: "3.1 km" },
  { name: "Lake View, Block C", eta: "35 min", distance: "5.6 km" },
];

function RoutePage() {
  return (
    <RoleGate role="driver">
      {() => (
        <>
          <TopBar title="Optimized Route" subtitle="4 stops · 5.6 km" back="/driver" />
          <div className="px-5 py-5 space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-primary/15 via-info/15 to-success/20 shadow-soft">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M30 170 Q 100 140 150 120 T 280 60 T 380 30" stroke="oklch(0.58 0.17 152)" strokeWidth="3" strokeDasharray="6 4" fill="none" />
                {[
                  [30, 170], [150, 120], [280, 60], [380, 30],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="6" fill="oklch(0.58 0.17 152)" stroke="white" strokeWidth="2" />
                ))}
              </svg>
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <RouteIcon className="h-3 w-3 text-primary" /> Smart Route Optimized
              </div>
            </div>

            <button className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl shadow-soft hover:shadow-glow transition-smooth flex items-center justify-center gap-2">
              <Navigation className="h-4 w-4" /> Start Navigation
            </button>

            <div className="bg-card rounded-2xl border border-border/60 shadow-soft divide-y divide-border">
              {STOPS.map((s, i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 grid place-items-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" /> {s.name}</p>
                    <p className="text-[11px] text-muted-foreground">ETA {s.eta} · {s.distance}</p>
                  </div>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </RoleGate>
  );
}
