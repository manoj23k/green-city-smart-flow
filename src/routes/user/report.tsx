import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, MapPin, Trash2, Cpu, Leaf, ImagePlus, Send, Locate } from "lucide-react";
import { RoleGate } from "@/components/app/RoleGate";
import { TopBar } from "@/components/app/TopBar";

export const Route = createFileRoute("/user/report")({
  head: () => ({ meta: [{ title: "Report Waste — Smart Waste Management" }] }),
  component: ReportWaste,
});

const TYPES = [
  { value: "solid", label: "Solid Waste", icon: Trash2, color: "bg-warning/15 text-warning" },
  { value: "bio", label: "Bio-waste", icon: Leaf, color: "bg-success/15 text-success" },
  { value: "ewaste", label: "E-waste", icon: Cpu, color: "bg-info/15 text-info" },
] as const;

const PRIORITIES = ["Low", "Normal", "High", "Critical"] as const;

function ReportWaste() {
  const navigate = useNavigate();
  const [type, setType] = useState<typeof TYPES[number]["value"]>("solid");
  const [priority, setPriority] = useState<typeof PRIORITIES[number]>("Normal");
  const [photo, setPhoto] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<string>("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setCoords("Unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
      () => setCoords("Permission denied"),
    );
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setTimeout(() => navigate({ to: "/user" }), 1400);
    }, 900);
  };

  return (
    <RoleGate role="user">
      {() => (
        <>
          <TopBar title="Report Waste" subtitle="Help keep your city clean" back="/user" />

          <form onSubmit={submit} className="px-5 py-5 space-y-5">
            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Waste type</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {TYPES.map(({ value, label, icon: Icon, color }) => {
                  const active = type === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setType(value)}
                      className={`p-3 rounded-2xl border-2 transition-smooth flex flex-col items-center gap-2 ${
                        active
                          ? "border-primary bg-accent shadow-soft"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className={`h-10 w-10 grid place-items-center rounded-xl ${color}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-semibold">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Photo</label>
              <label className="mt-2 block">
                <input type="file" accept="image/*" capture="environment" onChange={onPhoto} className="hidden" />
                {photo ? (
                  <div className="relative rounded-2xl overflow-hidden border border-border">
                    <img src={photo} alt="Waste preview" className="w-full h-48 object-cover" />
                    <span className="absolute bottom-2 right-2 bg-card/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Camera className="h-3 w-3" /> Tap to retake
                    </span>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center bg-muted/40 hover:border-primary/50 transition-smooth">
                    <ImagePlus className="h-8 w-8 mx-auto text-primary" />
                    <p className="mt-2 text-sm font-semibold">Take photo or choose from gallery</p>
                    <p className="text-[11px] text-muted-foreground">Photo will be tagged with location</p>
                  </div>
                )}
              </label>
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Location</label>
              <div className="mt-2 space-y-2">
                <button
                  type="button"
                  onClick={detectLocation}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:bg-accent/80 transition-smooth"
                >
                  <Locate className="h-4 w-4" />
                  {coords ? `GPS: ${coords}` : "Detect my GPS location"}
                </button>
                <div className="flex items-center gap-2 bg-input/40 border border-border rounded-xl px-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address manually"
                    className="flex-1 bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                placeholder="Describe the waste situation…"
                className="mt-2 w-full bg-input/40 border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {PRIORITIES.map((p) => {
                  const active = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-smooth border ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || done}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl shadow-soft hover:shadow-glow transition-smooth flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {done ? "Submitted ✓" : submitting ? "Submitting…" : (<><Send className="h-4 w-4" /> Submit Report</>)}
            </button>
          </form>
        </>
      )}
    </RoleGate>
  );
}
