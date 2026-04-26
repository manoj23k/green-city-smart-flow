import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MapPin } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/driver/history")({
  head: () => ({ meta: [{ title: "Collection History — Smart Waste Management" }] }),
  component: HistoryPage,
});

const ITEMS = [
  { id: "T-1041", address: "Green Park, House 7", type: "Solid", date: "Today 8:15 AM" },
  { id: "T-1040", address: "Lake View, Block A", type: "Bio-waste", date: "Today 7:40 AM" },
  { id: "T-1039", address: "Sector 9, Bin #4", type: "Solid (Bin Full)", date: "Yesterday 6:10 PM" },
  { id: "T-1038", address: "Riverside Apt", type: "E-waste", date: "Yesterday 4:20 PM" },
  { id: "T-1037", address: "Old Town Sq", type: "Hazardous", date: "Yesterday 11:00 AM" },
];

function HistoryPage() {
  return (
    <RoleGate role="driver">
      {() => (
        <>
          <TopBar title="Collection History" back="/driver" />
          <div className="px-5 py-5 space-y-2">
            {ITEMS.map((i) => (
              <div key={i.id} className="bg-card rounded-xl p-3.5 border border-border/60 shadow-soft flex items-center gap-3">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-success/15 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{i.id} · {i.type}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3" /> {i.address}
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{i.date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </RoleGate>
  );
}
