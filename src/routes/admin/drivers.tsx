import { createFileRoute } from "@tanstack/react-router";
import { Truck, MapPin, Star } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/admin/drivers")({
  head: () => ({ meta: [{ title: "Drivers — Smart Waste Management" }] }),
  component: Drivers,
});

const DRIVERS = [
  { name: "Ravi Kumar", vehicle: "MH-12-AB-4521", zone: "Sector 14", status: "Active", tasks: 4, rating: 4.8 },
  { name: "Sandeep Patil", vehicle: "MH-12-CD-7710", zone: "MG Road", status: "Active", tasks: 6, rating: 4.6 },
  { name: "Imran Khan", vehicle: "MH-12-EF-3320", zone: "Lake View", status: "On Break", tasks: 2, rating: 4.9 },
  { name: "Priya Desai", vehicle: "MH-12-GH-9912", zone: "Park Lane", status: "Active", tasks: 5, rating: 4.7 },
  { name: "Vikram Joshi", vehicle: "MH-12-IJ-1184", zone: "Old Town", status: "Offline", tasks: 0, rating: 4.5 },
];

const STATUS_TONE: Record<string, string> = {
  Active: "bg-success/15 text-success",
  "On Break": "bg-warning/15 text-warning",
  Offline: "bg-muted text-muted-foreground",
};

function Drivers() {
  return (
    <RoleGate role="admin">
      {() => (
        <>
          <TopBar title="Drivers" subtitle="Live tracking & assignment" back="/admin" />
          <div className="px-5 py-5 space-y-2">
            {DRIVERS.map((d) => (
              <div key={d.vehicle} className="bg-card rounded-2xl p-4 border border-border/60 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground font-bold">
                    {d.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate">{d.name}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_TONE[d.status]}`}>
                        {d.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-2">
                      <span className="inline-flex items-center gap-1"><Truck className="h-3 w-3" />{d.vehicle}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{d.zone}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{d.tasks} tasks today</span>
                  <span className="flex items-center gap-1 text-warning font-semibold"><Star className="h-3 w-3" /> {d.rating}</span>
                  <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg font-semibold">Assign</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </RoleGate>
  );
}
