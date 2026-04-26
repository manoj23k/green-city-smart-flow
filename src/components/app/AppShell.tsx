import { ReactNode } from "react";

export function AppShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`app-shell ${className}`}>{children}</div>;
}
