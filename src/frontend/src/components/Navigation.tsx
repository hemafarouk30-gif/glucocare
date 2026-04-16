import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, FlaskConical } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Glucose Dashboard",
    href: "/",
    icon: Activity,
    ocid: "nav.dashboard_tab",
  },
  {
    label: "Critical Analyst",
    href: "/critical-analyst",
    icon: FlaskConical,
    ocid: "nav.critical_analyst_tab",
  },
];

export function Navigation() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="bg-card border-b border-border"
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-0" role="tablist">
          {NAV_ITEMS.map(({ label, href, icon: Icon, ocid }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                to={href}
                role="tab"
                aria-selected={active}
                data-ocid={ocid}
                className={[
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                ].join(" ")}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
