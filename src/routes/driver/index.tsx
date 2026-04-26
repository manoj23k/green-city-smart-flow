import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, MapPin, Clock, AlertTriangle, CheckCircle2, Camera, Navigation } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { StatCard } from "@/components/app/StatCard";

export const Route = createFileRoute("/driver/")({
  head: () => ({ meta: [{ title: "Driver Tasks — Smart Waste Management" }] }),
  component: DriverHome,
});

interface Task {
  id: string;
  address: string;
  type: string;
  time: string;
  priority: "Normal" | "High" | "Critical";
  status: "pending" | "in_progress" | "done";
}

const INITIAL: Task[] = [
  { id: "T-1042", address: "Sector 14, House 22", type: "Bio-waste", time: "9:30 AM", priority: "Normal", status: "in_progress" },
  { id: "T-1043", address: "MG Road, Bin #12", type: "Solid (Bin Full)", time: "10:00 AM", priority: "High", status: "pending" },
  { id: "T-1044", address: "Park Lane, Plot 5", type: "E-waste", time: "11:00 AM", priority: "Normal", status: "pending" },
  { id: "T-1045", address: "Lake View, Block C", type: "Hazardous (Emergency)", time: "ASAP", priority: "Critical", status: "pending" },
];

const PRIORITY_TONE: Record<Task["priority"], string> = {
  Normal: "bg-info/15 text-info",
  High: "bg-warning/15 text-warning",
  Critical: "bg-destructive/15 text-destructive",
};

function DriverHome() {
  const [tasks, setTasks] = useState(INITIAL);

  const completeTask = (id: string) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, status: "done" } : x)));
  };

  const pending = tasks.filter((t) => t.status !== "done").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <RoleGate role="driver">
      {(user) => (
        <>
          <section className="bg-gradient-hero text-primary-foreground px-5 pt-6 pb-12 rounded-b-[2rem] relative overflow-hidden">
            <div className="absolute -right-12 top-4 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative">
              <p className="text-xs text-primary-foreground/85">Good morning,</p>
              <h2 className="text-xl font-bold">{user.name} 🚛</h2>
              <p className="text-xs text-primary-foreground/85 mt-1">Vehicle MH-12-AB-4521</p>
            </div>
          </section>

          <section className="px-5 -mt-7">
            <div className="grid grid-cols-3 gap-2.5">
              <StatCard label="Pending" value={pending} icon={<Clock className="h-4 w-4" />} tone="warning" />
              <StatCard label="Completed" value={done} icon={<CheckCircle2 className="h-4 w-4" />} tone="success" />
              <StatCard label="Distance" value="12km" icon={<Navigation className="h-4 w-4" />} tone="info" />
            </div>
          </section>

          <section className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Today's Tasks</h3>
              <Link to="/driver/navigate" className="text-xs font-semibold text-primary">View route →</Link>
            </div>
            <div className="space-y-3">
              {tasks.map((t) => (
                <div key={t.id} className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/60 animate-float-up">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 grid place-items-center rounded-xl bg-primary/10 text-primary">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.id} · {t.type}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {t.address}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${PRIORITY_TONE[t.priority]}`}>
                      {t.priority}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t.time}
                    </span>
                    {t.status === "done" ? (
                      <span className="flex items-center gap-1 text-success font-semibold">
                        <CheckCircle2 className="h-4 w-4" /> Completed
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-semibold flex items-center gap-1">
                          <Camera className="h-3 w-3" /> Proof
                        </button>
                        <button
                          onClick={() => completeTask(t.id)}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold"
                        >
                          Mark Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency alert */}
          <section className="px-5 mt-6 mb-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-destructive">1 emergency complaint nearby</p>
                <p className="text-xs text-muted-foreground">Lake View, Block C — Hazardous waste</p>
              </div>
              <button className="text-xs font-semibold bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full">
                Accept
              </button>
            </div>
          </section>
        </>
      )}
    </RoleGate>
  );
}
