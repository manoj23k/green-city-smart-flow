import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Truck, CheckCircle2 } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/schedule")({
  head: () => ({ meta: [{ title: "Schedule Pickup — Smart Waste Management" }] }),
  component: SchedulePickup,
});

const SLOTS = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

function SchedulePickup() {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [slot, setSlot] = useState<string>("10:00 AM");
  const [address, setAddress] = useState("Sector 14, Smart City");
  const [confirmed, setConfirmed] = useState(false);

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => navigate({ to: "/user" }), 1800);
  };

  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Schedule Pickup" subtitle="Choose a convenient slot" back="/user" />
          <div className="px-5 py-5 space-y-5">
            {confirmed ? (
              <div className="bg-success/10 border border-success/30 rounded-2xl p-6 text-center animate-float-up">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <h3 className="mt-3 font-bold text-lg">Pickup Confirmed!</h3>
                <p className="text-sm text-muted-foreground mt-1">Driver assigned. You'll receive updates shortly.</p>
              </div>
            ) : (
              <form onSubmit={confirm} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup date</label>
                  <div className="mt-2 flex items-center gap-2 bg-input/40 border border-border rounded-xl px-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="flex-1 bg-transparent py-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Time slot</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {SLOTS.map((s) => {
                      const active = slot === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSlot(s)}
                          className={`py-2.5 rounded-xl text-xs font-semibold transition-smooth border flex items-center justify-center gap-1 ${
                            active
                              ? "bg-primary text-primary-foreground border-primary shadow-soft"
                              : "bg-card border-border hover:border-primary/40"
                          }`}
                        >
                          <Clock className="h-3 w-3" /> {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup address</label>
                  <div className="mt-2 flex items-center gap-2 bg-input/40 border border-border rounded-xl px-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1 bg-transparent py-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="bg-gradient-card rounded-2xl p-4 border border-border/60 shadow-soft">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Assigned driver</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-11 w-11 grid place-items-center rounded-full bg-primary/10 text-primary">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Ravi Kumar</p>
                      <p className="text-xs text-muted-foreground">⭐ 4.8 · Vehicle MH-12-AB-4521</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl shadow-soft hover:shadow-glow transition-smooth"
                >
                  Confirm Pickup
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </RoleGate>
  );
}
