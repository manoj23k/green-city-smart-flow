import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Recycle, ArrowRight, ShieldCheck, Truck, User as UserIcon } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { loginWithCredentials, loginDemo, dashboardPathFor, type Role } from "@/lib/auth";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Smart Waste Management" },
      { name: "description", content: "Sign in as Citizen, Pickup Driver or City Admin." },
    ],
  }),
  component: LoginPage,
});

const ROLES: { value: Role; label: string; icon: React.ElementType }[] = [
  { value: "user", label: "Citizen", icon: UserIcon },
  { value: "driver", label: "Driver", icon: Truck },
  { value: "admin", label: "Admin", icon: ShieldCheck },
];

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const u = loginWithCredentials(email, password, role);
      navigate({ to: dashboardPathFor(u.role) });
    }, 600);
  };

  const useDemo = () => {
    const u = loginDemo(role);
    navigate({ to: dashboardPathFor(u.role) });
  };

  return (
    <AppShell>
      <div className="min-h-dvh flex flex-col">
        {/* Top hero */}
        <div className="bg-gradient-hero text-primary-foreground px-6 pt-10 pb-12 rounded-b-[2rem] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute right-12 bottom-0 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex items-center gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-2xl bg-white/95">
              <img src={logo} alt="logo" className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Smart Waste Management</h1>
              <p className="text-xs text-primary-foreground/85 flex items-center gap-1">
                Clean City, Green Future <Recycle className="h-3 w-3" />
              </p>
            </div>
          </div>
          <h2 className="relative mt-8 text-2xl font-semibold">Welcome back 👋</h2>
          <p className="relative text-sm text-primary-foreground/85">Sign in to continue your eco journey.</p>
        </div>

        {/* Form card */}
        <div className="px-5 -mt-6">
          <div className="bg-card rounded-3xl shadow-card p-5 border border-border/60 animate-float-up">
            {/* Role tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-2xl">
              {ROLES.map((r) => {
                const active = r.value === role;
                const Icon = r.icon;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-semibold transition-smooth ${
                      active
                        ? "bg-card text-primary shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {r.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <div className="mt-1 flex items-center gap-2 bg-input/40 border border-border rounded-xl px-3 focus-within:ring-2 focus-within:ring-ring transition-smooth">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent py-3 text-sm outline-none"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Password</label>
                  <button type="button" className="text-xs text-primary font-medium hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="mt-1 flex items-center gap-2 bg-input/40 border border-border rounded-xl px-3 focus-within:ring-2 focus-within:ring-ring transition-smooth">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent py-3 text-sm outline-none"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl shadow-soft hover:shadow-glow transition-smooth flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? "Signing in…" : (
                  <>
                    Sign in as {ROLES.find((r) => r.value === role)?.label}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 my-3 text-[11px] text-muted-foreground">
                <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
              </div>

              <button
                type="button"
                className="w-full border border-border rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-smooth"
              >
                <GoogleG />
                Continue with Google
              </button>

              <button
                type="button"
                onClick={useDemo}
                className="w-full bg-accent text-accent-foreground rounded-xl py-3 text-sm font-semibold hover:bg-accent/80 transition-smooth"
              >
                Use Demo {ROLES.find((r) => r.value === role)?.label} Account
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              New to Smart Waste?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Create account
              </Link>
            </p>
          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-4 pb-6">
            Secured with JWT · Smart City Initiative
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.8h5.4c-.2 1.4-1.7 4-5.4 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.5H12z" />
    </svg>
  );
}
