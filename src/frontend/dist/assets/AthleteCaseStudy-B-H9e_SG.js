import { X as createLucideIcon, L as reactExports, Z as jsxRuntimeExports, al as User, a2 as Activity, ak as FlaskConical, a3 as Button } from "./index-C9YpkX1-.js";
import { C as Card, c as CardContent, B as Badge, a as CardHeader, b as CardTitle, L as Label, I as Input } from "./label-B1JlLJsO.js";
import { a as ChevronUp, C as ChevronDown } from "./chevron-up-BDlkJMB-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
];
const Scale = createLucideIcon("scale", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const BMI_CATEGORIES = [
  { label: "Underweight", range: "< 18.5", color: "bg-secondary/20" },
  { label: "Healthy Weight", range: "18.5 – 24.9", color: "bg-primary/15" },
  {
    label: "Overweight",
    range: "25 – 29.9",
    color: "bg-accent/15",
    isAnomaly: true
  },
  { label: "Obese Class I", range: "30 – 34.9", color: "bg-destructive/10" },
  { label: "Obese Class II+", range: "≥ 35", color: "bg-destructive/20" }
];
const LEBRON = {
  name: "LeBron James",
  sport: "Basketball (NBA)",
  position: "Small Forward",
  heightCm: 206,
  weightKg: 113,
  achievements: "4× NBA Champion · 4× MVP · 20+ seasons at peak",
  description: "LeBron James is widely regarded as one of the greatest basketball players of all time. He maintains a physique built almost entirely of lean muscle mass, exceptional cardiovascular conditioning, and sub-10 % body fat — yet BMI labels him 'Overweight'."
};
const TYPICAL_OVERWEIGHT = {
  name: "Typical 'Overweight' Profile",
  heightCm: 175,
  weightKg: 77,
  note: "Average sedentary adult at BMI 25.2",
  bodyFat: "~28 – 32 %",
  muscleMass: "Below average",
  vo2Max: "~30 – 35 mL/kg/min",
  waistHip: "~0.90 (elevated risk)"
};
const LEBRON_HEALTH = {
  bodyFat: "~4 – 7 %",
  muscleMass: "Exceptional (elite)",
  vo2Max: "~55 – 60 mL/kg/min",
  waistHip: "~0.75 (optimal)"
};
function computeBMI(weightKg, heightCm) {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return weightKg / (heightCm / 100) ** 2;
}
function getBmiCategory(bmi) {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  if (bmi < 35) return BMI_CATEGORIES[3];
  return BMI_CATEGORIES[4];
}
function feetInchesFromCm(cm) {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inn = Math.round(totalIn % 12);
  return `${ft}′${inn}″`;
}
function AccordionItem({ title, explanation, ocid }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border overflow-hidden elevation-soft",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            "aria-expanded": open,
            className: "w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/30 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": `${ocid}.toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm leading-snug pr-4", children: title }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 flex-shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 flex-shrink-0 text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-5 pb-4 pt-2 bg-muted/20 text-sm text-muted-foreground leading-relaxed",
            "data-ocid": `${ocid}.content`,
            children: explanation
          }
        )
      ]
    }
  );
}
function BmiCalculator() {
  const [heightCm, setHeightCm] = reactExports.useState("");
  const [weightKg, setWeightKg] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const calculate = () => {
    const h = Number.parseFloat(heightCm);
    const w = Number.parseFloat(weightKg);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return;
    const bmi = computeBMI(w, h);
    setResult({ bmi, cat: getBmiCategory(bmi) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "elevation-soft", "data-ocid": "bmi_calculator.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5 text-primary" }),
        "Try It Yourself — BMI Calculator"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter any height and weight to see how BMI classifies them — and whether that classification makes sense." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-height", className: "text-sm font-medium", children: "Height (cm)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "calc-height",
              type: "number",
              min: 50,
              max: 280,
              placeholder: "e.g. 175",
              value: heightCm,
              onChange: (e) => setHeightCm(e.target.value),
              "data-ocid": "bmi_calculator.height_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-weight", className: "text-sm font-medium", children: "Weight (kg)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "calc-weight",
              type: "number",
              min: 10,
              max: 500,
              placeholder: "e.g. 70",
              value: weightKg,
              onChange: (e) => setWeightKg(e.target.value),
              "data-ocid": "bmi_calculator.weight_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: calculate,
          className: "w-full",
          "data-ocid": "bmi_calculator.calculate_button",
          children: "Calculate BMI"
        }
      ),
      result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-5 space-y-3",
          "data-ocid": "bmi_calculator.result",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Your BMI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-4xl font-bold", children: result.bmi.toFixed(1) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: [
                    "text-sm px-4 py-1.5",
                    result.cat.isAnomaly ? "bg-accent text-accent-foreground border-accent/40" : ""
                  ].join(" "),
                  variant: result.cat.isAnomaly ? "outline" : "secondary",
                  children: result.cat.label
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed border-t border-border pt-3", children: [
              "BMI range for ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: result.cat.label }),
              ":",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: result.cat.range }),
              ".",
              " ",
              result.cat.isAnomaly ? "Like LeBron James, people with high muscle mass often land in this range despite excellent health." : result.cat.label === "Healthy Weight" ? "BMI suggests a healthy weight range — but body composition, activity level, and other factors matter too." : "BMI is a population-level screening tool and should not be used as a sole health indicator."
            ] })
          ]
        }
      )
    ] })
  ] });
}
function AthleteCaseStudyPage() {
  const [showLimitations, setShowLimitations] = reactExports.useState(false);
  const lebronBmi = computeBMI(LEBRON.weightKg, LEBRON.heightCm);
  const lebronCat = getBmiCategory(lebronBmi);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 pb-12 space-y-8",
      "data-ocid": "athlete_case.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "The Athlete Anomaly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl text-base", children: 'Elite athletes routinely score "Overweight" or "Obese" on BMI despite peak physical health. This case study explores why BMI is an incomplete health metric.' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "elevation-medium border-0",
            "data-ocid": "athlete_case.profile_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col items-center text-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-24 h-24 rounded-full bg-primary/15 border-4 border-primary/30 flex items-center justify-center shadow-md",
                    "aria-label": "LeBron James avatar",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-primary select-none", children: "LJ" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: LEBRON.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: LEBRON.sport }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: LEBRON.position })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: LEBRON.achievements }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: LEBRON.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Physical Stats" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Height" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold", children: LEBRON.heightCm }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "cm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: feetInchesFromCm(LEBRON.heightCm) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Weight" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold", children: LEBRON.weightKg }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "kg" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: "250 lbs" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 text-center space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Calculated BMI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-5xl font-bold", children: lebronBmi.toFixed(1) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                    LEBRON.weightKg,
                    " ÷ (",
                    LEBRON.heightCm / 100,
                    ")² =",
                    " ",
                    lebronBmi.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "bg-accent/15 text-accent-foreground border-accent/40 font-semibold text-sm px-4 py-1",
                      "data-ocid": "athlete_case.bmi_category_badge",
                      children: [
                        lebronCat.label,
                        " ⚠"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "BMI Classification Scale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: BMI_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: [
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                      cat.label === lebronCat.label ? "bg-accent/20 border border-accent/40 font-semibold" : "bg-muted/30"
                    ].join(" "),
                    "data-ocid": `athlete_case.scale_row.${cat.label.toLowerCase().replace(/\s+/g, "_")}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: cat.range })
                    ]
                  },
                  cat.label
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed pt-1", children: [
                  "LeBron falls in the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-accent-foreground", children: "Overweight" }),
                  " ",
                  "band — highlighted above — despite elite athletic conditioning."
                ] })
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "athlete_case.comparison_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-5 h-5 text-primary" }),
            "Overweight — Two Very Different Stories"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border border-border elevation-soft",
                "data-ocid": "athlete_case.typical_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: TYPICAL_OVERWEIGHT.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: TYPICAL_OVERWEIGHT.note })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "BMI", value: "25.2 (Overweight)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Height / Weight",
                        value: `${TYPICAL_OVERWEIGHT.heightCm} cm / ${TYPICAL_OVERWEIGHT.weightKg} kg`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Body Fat", value: TYPICAL_OVERWEIGHT.bodyFat }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Muscle Mass",
                        value: TYPICAL_OVERWEIGHT.muscleMass
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "VO₂ Max", value: TYPICAL_OVERWEIGHT.vo2Max }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Waist-Hip Ratio",
                        value: TYPICAL_OVERWEIGHT.waistHip
                      }
                    )
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border border-accent/30 elevation-soft bg-accent/5",
                "data-ocid": "athlete_case.lebron_compare_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: LEBRON.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Elite NBA Forward · 4× Champion" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "BMI",
                        value: `${lebronBmi.toFixed(1)} (Overweight)`,
                        highlight: true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Height / Weight",
                        value: `${LEBRON.heightCm} cm / ${LEBRON.weightKg} kg`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Body Fat", value: LEBRON_HEALTH.bodyFat, highlight: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Muscle Mass",
                        value: LEBRON_HEALTH.muscleMass,
                        highlight: true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "VO₂ Max", value: LEBRON_HEALTH.vo2Max, highlight: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Row,
                      {
                        label: "Waist-Hip Ratio",
                        value: LEBRON_HEALTH.waistHip,
                        highlight: true
                      }
                    )
                  ] }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-accent flex-shrink-0 mt-0.5" }),
            'Both individuals score "Overweight" by BMI. The health realities could not be more different.'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "athlete_case.reflections_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-primary" }),
            "Critical Reflections"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AccordionItem,
              {
                ocid: "athlete_case.reflection1",
                title: "Why does BMI classify LeBron James as Overweight?",
                explanation: "Muscle weighs more than fat. LeBron's physique is almost entirely lean muscle mass, not excess fat. BMI uses only height and weight — it has no way to distinguish between 113 kg of muscle and 113 kg of adipose tissue. A person can be extremely muscular and have very low body fat, yet still score in the 'Overweight' or even 'Obese' range. LeBron's body fat is estimated at 4–7%, which is elite athlete territory — far healthier than most people in the 'Healthy Weight' BMI range."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AccordionItem,
              {
                ocid: "athlete_case.reflection2",
                title: "What health metrics might better describe athletic health?",
                explanation: "Body fat percentage is the most direct replacement — it measures actual adipose tissue vs lean mass. Muscle mass ratio (lean mass as a % of total weight) captures the quality of that weight. VO₂ max (maximal oxygen uptake) is one of the best predictors of cardiovascular health and longevity. Waist-to-hip ratio and waist-to-height ratio better predict metabolic risk than BMI. Comprehensive bloodwork (HbA1c, lipid panel, CRP) captures internal health that no external measurement can. For athletes, DEXA scans provide a full body composition breakdown."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "athlete_case.limitations_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border elevation-soft overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowLimitations((v) => !v),
              "aria-expanded": showLimitations,
              className: "w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/30 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "athlete_case.limitations_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "Historical Context & BMI Limitations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Why is a 19th-century formula still used today?" })
                ] }),
                showLimitations ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-muted-foreground flex-shrink-0" })
              ]
            }
          ),
          showLimitations && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-6 py-5 bg-muted/20 space-y-4 text-sm text-muted-foreground leading-relaxed border-t border-border",
              "data-ocid": "athlete_case.limitations_content",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm", children: "Historical Origins" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "BMI was developed by Adolphe Quetelet, a Belgian statistician, in the ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1830s" }),
                    '. He created it as a tool to describe the "average man" across populations — not as a medical diagnostic for individuals. Quetelet himself warned it should never be used to measure individual health. His sample was exclusively white European men.'
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm", children: "Limitations for Athletes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Athletes have high muscle mass, which weighs significantly more than fat. A strength athlete with 8% body fat and a sedentary person with 32% body fat can share the same BMI. BMI cannot distinguish lean mass from fat mass, making it entirely unreliable for athletic populations." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm", children: "Limitations by Demographics" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "Research shows BMI systematically",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "overestimates" }),
                    " ",
                    "health risk in Black individuals (who tend to have denser bones and more muscle) and",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "underestimates" }),
                    " ",
                    'risk in Asian populations (who develop metabolic disease at lower BMIs). Elderly patients lose muscle mass with age, causing BMI to appear "healthy" while masking sarcopenia. For children, age- and sex-specific percentiles must be used — adult thresholds are biologically inappropriate.'
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm", children: "Why It Persists" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Despite these flaws, BMI remains in wide use because it requires only a scale and a tape measure — no lab work, imaging, or specialist. It's free, fast, and consistent enough for large-scale epidemiological studies. The medical community is actively working to supplement BMI with better tools, and several professional organizations now explicitly caution against using BMI as a sole health indicator." })
                ] })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-l-4 border-l-accent bg-accent/5",
            "data-ocid": "athlete_case.social_justice_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Social Justice Note:" }),
              " BMI was created in the 1830s using data from white European men. It does not account for sex, age, ethnicity, or muscle distribution. Research consistently shows BMI misclassifies Black athletes, Asian adults, women, elderly patients, and anyone with high muscle mass — making it a poor and potentially harmful basis for individual health decisions or medical gatekeeping."
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BmiCalculator, {})
      ]
    }
  );
}
function Row({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: [
          "font-mono text-xs",
          highlight ? "font-semibold text-primary" : "text-foreground"
        ].join(" "),
        children: value
      }
    )
  ] });
}
export {
  AthleteCaseStudyPage
};
