import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "primary",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: "primary" | "warning" | "info" | "destructive" | "success";
}) {
  const toneBg: Record<string, string> = {
    primary: "bg-accent text-primary",
    warning: "bg-warning/15 text-warning",
    info: "bg-info/15 text-info",
    destructive: "bg-destructive/15 text-destructive",
    success: "bg-success/15 text-success",
  };
  return (
    <div className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/60">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {icon ? (
          <span className={`h-8 w-8 grid place-items-center rounded-xl ${toneBg[tone]}`}>{icon}</span>
        ) : null}
      </div>
      <div className="mt-2 text-2xl font-bold text-foreground tabular-nums">{value}</div>
      {hint ? <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div> : null}
    </div>
  );
}
