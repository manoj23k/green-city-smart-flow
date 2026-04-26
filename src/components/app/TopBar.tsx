import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  back?: string;
  right?: ReactNode;
  subtitle?: string;
}

export function TopBar({ title, back, right, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-primary text-primary-foreground px-4 pt-4 pb-5 rounded-b-3xl shadow-card">
      <div className="flex items-center gap-3">
        {back ? (
          <Link
            to={back}
            className="h-9 w-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-smooth"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : null}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
          {subtitle ? <p className="text-xs text-primary-foreground/80 truncate">{subtitle}</p> : null}
        </div>
        {right ?? (
          <button
            type="button"
            className="h-9 w-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-smooth"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  );
}
