import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Trash2, Skull, Flame, Ban, Send } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/emergency")({
  head: () => ({ meta: [{ title: "Emergency Complaint — Smart Waste Management" }] }),
  component: Emergency,
});

const KINDS = [
  { value: "overflow", label: "Overflowing garbage", icon: Trash2, tone: "bg-warning/15 text-warning" },
  { value: "dead-animal", label: "Dead animal", icon: Skull, tone: "bg-muted text-foreground" },
  { value: "hazardous", label: "Hazardous waste", icon: Flame, tone: "bg-destructive/15 text-destructive" },
  { value: "illegal", label: "Illegal dumping", icon: Ban, tone: "bg-info/15 text-info" },
];

function Emergency() {
  const navigate = useNavigate();
  const [kind, setKind] = useState(KINDS[0].value);
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => navigate({ to: "/user" }), 1500);
  };

  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Emergency Complaint" subtitle="High-priority alert to admin" back="/user" />
          <div className="px-5 py-5">
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-3 flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-xs text-destructive font-semibold">Use only for urgent issues. Admin is alerted instantly.</p>
            </div>
            {sent ? (
              <div className="bg-success/10 border border-success/30 rounded-2xl p-6 text-center animate-float-up">
                <AlertTriangle className="h-10 w-10 text-success mx-auto" />
                <p className="mt-2 font-bold">Alert sent to admin</p>
                <p className="text-xs text-muted-foreground">A field officer will be dispatched shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Type of complaint</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {KINDS.map(({ value, label, icon: Icon, tone }) => {
                      const active = kind === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setKind(value)}
                          className={`p-3 rounded-2xl border-2 transition-smooth flex items-center gap-2 text-left ${
                            active ? "border-primary bg-accent shadow-soft" : "border-border bg-card hover:border-primary/40"
                          }`}
                        >
                          <span className={`h-9 w-9 grid place-items-center rounded-xl ${tone}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-semibold">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Details</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    placeholder="Describe what's happening and where…"
                    className="mt-2 w-full bg-input/40 border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-destructive text-destructive-foreground font-semibold py-3.5 rounded-xl shadow-soft hover:shadow-glow transition-smooth flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Emergency Alert
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </RoleGate>
  );
}
