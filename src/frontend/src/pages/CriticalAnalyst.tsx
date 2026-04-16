import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, FlaskConical, User } from "lucide-react";

const SUB_TABS = [
  {
    label: "BMI Mapper",
    href: "/critical-analyst/bmi-mapper",
    icon: BarChart2,
    ocid: "analyst.bmi_tab",
  },
  {
    label: "Athlete Case Study",
    href: "/critical-analyst/athlete-case-study",
    icon: User,
    ocid: "analyst.athlete_tab",
  },
];

export function CriticalAnalystPage() {
  const { pathname } = useLocation();

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-6"
      data-ocid="critical_analyst.page"
    >
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Open Access · No login required
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Critical Analyst: BMI &amp; Lifestyle Reflection
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          An interactive exploration of the Body Mass Index model — its
          mathematical underpinnings, real-world limitations, and why BMI can be
          a poor indicator of individual health. Open to everyone.
        </p>
      </div>

      {/* Sub-tab navigation */}
      <div
        className="flex gap-1 mb-6 bg-muted/40 p-1 rounded-lg w-fit"
        role="tablist"
        data-ocid="analyst.subtab_bar"
      >
        {SUB_TABS.map(({ label, href, icon: Icon, ocid }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              to={href}
              role="tab"
              aria-selected={active}
              data-ocid={ocid}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-card text-foreground elevation-soft"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Intro cards when on /critical-analyst root */}
      {pathname === "/critical-analyst" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/critical-analyst/bmi-mapper"
            className="group bg-card border border-border rounded-xl p-6 elevation-soft hover:elevation-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="analyst.bmi_intro_card"
          >
            <BarChart2 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-smooth" />
            <h2 className="font-display text-xl font-bold mb-2">BMI Mapper</h2>
            <p className="text-sm text-muted-foreground">
              Visualize BMI categories as inequality regions on a
              weight-vs-height graph. See how the "healthy" range forms a curve
              — and where its boundaries break down.
            </p>
          </Link>

          <Link
            to="/critical-analyst/athlete-case-study"
            className="group bg-card border border-border rounded-xl p-6 elevation-soft hover:elevation-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="analyst.athlete_intro_card"
          >
            <User className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-smooth" />
            <h2 className="font-display text-xl font-bold mb-2">
              Athlete Case Study
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore the "Athlete Anomaly" — elite athletes routinely score as
              "overweight" or "obese" by BMI, despite being in peak health.
              Reflect on what this means for health metrics.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
