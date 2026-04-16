import { aj as useRouterState, X as createLucideIcon, Z as jsxRuntimeExports, ak as FlaskConical, al as User, am as Link } from "./index-C9YpkX1-.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode);
const SUB_TABS = [
  {
    label: "BMI Mapper",
    href: "/critical-analyst/bmi-mapper",
    icon: ChartNoAxesColumn,
    ocid: "analyst.bmi_tab"
  },
  {
    label: "Athlete Case Study",
    href: "/critical-analyst/athlete-case-study",
    icon: User,
    ocid: "analyst.athlete_tab"
  }
];
function CriticalAnalystPage() {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-6",
      "data-ocid": "critical_analyst.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Open Access · No login required" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Critical Analyst: BMI & Lifestyle Reflection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl", children: "An interactive exploration of the Body Mass Index model — its mathematical underpinnings, real-world limitations, and why BMI can be a poor indicator of individual health. Open to everyone." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 mb-6 bg-muted/40 p-1 rounded-lg w-fit",
            role: "tablist",
            "data-ocid": "analyst.subtab_bar",
            children: SUB_TABS.map(({ label, href, icon: Icon, ocid }) => {
              const active = pathname === href;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: href,
                  role: "tab",
                  "aria-selected": active,
                  "data-ocid": ocid,
                  className: [
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active ? "bg-card text-foreground elevation-soft" : "text-muted-foreground hover:text-foreground"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                    label
                  ]
                },
                href
              );
            })
          }
        ),
        pathname === "/critical-analyst" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/critical-analyst/bmi-mapper",
              className: "group bg-card border border-border rounded-xl p-6 elevation-soft hover:elevation-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "analyst.bmi_intro_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-smooth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "BMI Mapper" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Visualize BMI categories as inequality regions on a weight-vs-height graph. See how the "healthy" range forms a curve — and where its boundaries break down.' })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/critical-analyst/athlete-case-study",
              className: "group bg-card border border-border rounded-xl p-6 elevation-soft hover:elevation-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "analyst.athlete_intro_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-smooth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "Athlete Case Study" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Explore the "Athlete Anomaly" — elite athletes routinely score as "overweight" or "obese" by BMI, despite being in peak health. Reflect on what this means for health metrics.' })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  CriticalAnalystPage
};
