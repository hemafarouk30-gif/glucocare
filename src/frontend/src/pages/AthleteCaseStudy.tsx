import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Heart,
  Scale,
  User,
} from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BmiCategory {
  label: string;
  range: string;
  color: string; // Tailwind bg token for the comparison table
  isAnomaly?: boolean; // Coral-red override for the badge
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BMI_CATEGORIES: BmiCategory[] = [
  { label: "Underweight", range: "< 18.5", color: "bg-secondary/20" },
  { label: "Healthy Weight", range: "18.5 – 24.9", color: "bg-primary/15" },
  {
    label: "Overweight",
    range: "25 – 29.9",
    color: "bg-accent/15",
    isAnomaly: true,
  },
  { label: "Obese Class I", range: "30 – 34.9", color: "bg-destructive/10" },
  { label: "Obese Class II+", range: "≥ 35", color: "bg-destructive/20" },
];

const LEBRON = {
  name: "LeBron James",
  sport: "Basketball (NBA)",
  position: "Small Forward",
  heightCm: 206,
  weightKg: 113,
  heightDisplay: "6′9″ (206 cm)",
  weightDisplay: "250 lbs (113 kg)",
  achievements: "4× NBA Champion · 4× MVP · 20+ seasons at peak",
  description:
    "LeBron James is widely regarded as one of the greatest basketball players of all time. He maintains a physique built almost entirely of lean muscle mass, exceptional cardiovascular conditioning, and sub-10 % body fat — yet BMI labels him 'Overweight'.",
};

const TYPICAL_OVERWEIGHT = {
  name: "Typical 'Overweight' Profile",
  heightCm: 175,
  weightKg: 77,
  note: "Average sedentary adult at BMI 25.2",
  bodyFat: "~28 – 32 %",
  muscleMass: "Below average",
  vo2Max: "~30 – 35 mL/kg/min",
  waistHip: "~0.90 (elevated risk)",
};

const LEBRON_HEALTH = {
  bodyFat: "~4 – 7 %",
  muscleMass: "Exceptional (elite)",
  vo2Max: "~55 – 60 mL/kg/min",
  waistHip: "~0.75 (optimal)",
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function computeBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return weightKg / (heightCm / 100) ** 2;
}

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  if (bmi < 35) return BMI_CATEGORIES[3];
  return BMI_CATEGORIES[4];
}

function feetInchesFromCm(cm: number): string {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inn = Math.round(totalIn % 12);
  return `${ft}′${inn}″`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface AccordionItemProps {
  title: string;
  explanation: string;
  ocid: string;
}

function AccordionItem({ title, explanation, ocid }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border border-border overflow-hidden elevation-soft"
      data-ocid={ocid}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/30 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid={`${ocid}.toggle`}
      >
        <span className="font-medium text-sm leading-snug pr-4">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div
          className="px-5 pb-4 pt-2 bg-muted/20 text-sm text-muted-foreground leading-relaxed"
          data-ocid={`${ocid}.content`}
        >
          {explanation}
        </div>
      )}
    </div>
  );
}

// ─── Custom BMI Calculator ────────────────────────────────────────────────────

function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    cat: BmiCategory;
  } | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(heightCm);
    const w = Number.parseFloat(weightKg);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return;
    const bmi = computeBMI(w, h);
    setResult({ bmi, cat: getBmiCategory(bmi) });
  };

  return (
    <Card className="elevation-soft" data-ocid="bmi_calculator.card">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          Try It Yourself — BMI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Enter any height and weight to see how BMI classifies them — and
          whether that classification makes sense.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="calc-height" className="text-sm font-medium">
              Height (cm)
            </Label>
            <Input
              id="calc-height"
              type="number"
              min={50}
              max={280}
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              data-ocid="bmi_calculator.height_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="calc-weight" className="text-sm font-medium">
              Weight (kg)
            </Label>
            <Input
              id="calc-weight"
              type="number"
              min={10}
              max={500}
              placeholder="e.g. 70"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              data-ocid="bmi_calculator.weight_input"
            />
          </div>
        </div>

        <Button
          onClick={calculate}
          className="w-full"
          data-ocid="bmi_calculator.calculate_button"
        >
          Calculate BMI
        </Button>

        {result && (
          <div
            className="rounded-xl border border-border bg-card p-5 space-y-3"
            data-ocid="bmi_calculator.result"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Your BMI
                </p>
                <p className="font-mono text-4xl font-bold">
                  {result.bmi.toFixed(1)}
                </p>
              </div>
              <Badge
                className={[
                  "text-sm px-4 py-1.5",
                  result.cat.isAnomaly
                    ? "bg-accent text-accent-foreground border-accent/40"
                    : "",
                ].join(" ")}
                variant={result.cat.isAnomaly ? "outline" : "secondary"}
              >
                {result.cat.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
              BMI range for <strong>{result.cat.label}</strong>:{" "}
              <span className="font-mono">{result.cat.range}</span>.{" "}
              {result.cat.isAnomaly
                ? "Like LeBron James, people with high muscle mass often land in this range despite excellent health."
                : result.cat.label === "Healthy Weight"
                  ? "BMI suggests a healthy weight range — but body composition, activity level, and other factors matter too."
                  : "BMI is a population-level screening tool and should not be used as a sole health indicator."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AthleteCaseStudyPage() {
  const [showLimitations, setShowLimitations] = useState(false);

  const lebronBmi = computeBMI(LEBRON.weightKg, LEBRON.heightCm);
  const lebronCat = getBmiCategory(lebronBmi);

  return (
    <div
      className="max-w-5xl mx-auto px-4 pb-12 space-y-8"
      data-ocid="athlete_case.page"
    >
      {/* Page header */}
      <div className="pt-6 space-y-1">
        <h2 className="font-display text-3xl font-bold">The Athlete Anomaly</h2>
        <p className="text-muted-foreground max-w-2xl text-base">
          Elite athletes routinely score "Overweight" or "Obese" on BMI despite
          peak physical health. This case study explores why BMI is an
          incomplete health metric.
        </p>
      </div>

      {/* ── Athlete profile card ─────────────────────────────────────── */}
      <Card
        className="elevation-medium border-0"
        data-ocid="athlete_case.profile_card"
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Avatar + bio */}
            <div className="p-6 flex flex-col items-center text-center gap-4">
              {/* Avatar with initials */}
              <div
                className="w-24 h-24 rounded-full bg-primary/15 border-4 border-primary/30 flex items-center justify-center shadow-md"
                aria-label="LeBron James avatar"
              >
                <span className="font-display text-2xl font-bold text-primary select-none">
                  LJ
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {LEBRON.name}
                </h3>
                <p className="text-sm text-muted-foreground">{LEBRON.sport}</p>
                <p className="text-xs text-muted-foreground">
                  {LEBRON.position}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {LEBRON.achievements}
              </Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {LEBRON.description}
              </p>
            </div>

            {/* Stats */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Physical Stats
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Height</p>
                  <p className="font-mono text-2xl font-bold">
                    {LEBRON.heightCm}
                  </p>
                  <p className="text-xs text-muted-foreground">cm</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                    {feetInchesFromCm(LEBRON.heightCm)}
                  </p>
                </div>
                <div className="bg-muted/40 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Weight</p>
                  <p className="font-mono text-2xl font-bold">
                    {LEBRON.weightKg}
                  </p>
                  <p className="text-xs text-muted-foreground">kg</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                    250 lbs
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-center space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Calculated BMI
                </p>
                <p className="font-mono text-5xl font-bold">
                  {lebronBmi.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {LEBRON.weightKg} ÷ ({LEBRON.heightCm / 100})² ={" "}
                  {lebronBmi.toFixed(2)}
                </p>
                {/* Coral-red badge to emphasise the anomaly */}
                <Badge
                  variant="outline"
                  className="bg-accent/15 text-accent-foreground border-accent/40 font-semibold text-sm px-4 py-1"
                  data-ocid="athlete_case.bmi_category_badge"
                >
                  {lebronCat.label} ⚠
                </Badge>
              </div>
            </div>

            {/* BMI scale context */}
            <div className="p-6 space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                BMI Classification Scale
              </h4>
              <div className="space-y-1.5">
                {BMI_CATEGORIES.map((cat) => (
                  <div
                    key={cat.label}
                    className={[
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                      cat.label === lebronCat.label
                        ? "bg-accent/20 border border-accent/40 font-semibold"
                        : "bg-muted/30",
                    ].join(" ")}
                    data-ocid={`athlete_case.scale_row.${cat.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {cat.range}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                LeBron falls in the{" "}
                <strong className="text-accent-foreground">Overweight</strong>{" "}
                band — highlighted above — despite elite athletic conditioning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Comparison section ───────────────────────────────────────── */}
      <section data-ocid="athlete_case.comparison_section">
        <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Overweight — Two Very Different Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Typical Overweight */}
          <Card
            className="border border-border elevation-soft"
            data-ocid="athlete_case.typical_card"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base font-display">
                    {TYPICAL_OVERWEIGHT.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {TYPICAL_OVERWEIGHT.note}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1.5">
                <Row label="BMI" value="25.2 (Overweight)" />
                <Row
                  label="Height / Weight"
                  value={`${TYPICAL_OVERWEIGHT.heightCm} cm / ${TYPICAL_OVERWEIGHT.weightKg} kg`}
                />
                <Row label="Body Fat" value={TYPICAL_OVERWEIGHT.bodyFat} />
                <Row
                  label="Muscle Mass"
                  value={TYPICAL_OVERWEIGHT.muscleMass}
                />
                <Row label="VO₂ Max" value={TYPICAL_OVERWEIGHT.vo2Max} />
                <Row
                  label="Waist-Hip Ratio"
                  value={TYPICAL_OVERWEIGHT.waistHip}
                />
              </div>
            </CardContent>
          </Card>

          {/* LeBron */}
          <Card
            className="border border-accent/30 elevation-soft bg-accent/5"
            data-ocid="athlete_case.lebron_compare_card"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-display">
                    {LEBRON.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Elite NBA Forward · 4× Champion
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1.5">
                <Row
                  label="BMI"
                  value={`${lebronBmi.toFixed(1)} (Overweight)`}
                  highlight
                />
                <Row
                  label="Height / Weight"
                  value={`${LEBRON.heightCm} cm / ${LEBRON.weightKg} kg`}
                />
                <Row label="Body Fat" value={LEBRON_HEALTH.bodyFat} highlight />
                <Row
                  label="Muscle Mass"
                  value={LEBRON_HEALTH.muscleMass}
                  highlight
                />
                <Row label="VO₂ Max" value={LEBRON_HEALTH.vo2Max} highlight />
                <Row
                  label="Waist-Hip Ratio"
                  value={LEBRON_HEALTH.waistHip}
                  highlight
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground mt-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          Both individuals score "Overweight" by BMI. The health realities could
          not be more different.
        </p>
      </section>

      {/* ── Reflection prompts ───────────────────────────────────────── */}
      <section data-ocid="athlete_case.reflections_section">
        <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Critical Reflections
        </h3>
        <div className="space-y-3">
          <AccordionItem
            ocid="athlete_case.reflection1"
            title="Why does BMI classify LeBron James as Overweight?"
            explanation="Muscle weighs more than fat. LeBron's physique is almost entirely lean muscle mass, not excess fat. BMI uses only height and weight — it has no way to distinguish between 113 kg of muscle and 113 kg of adipose tissue. A person can be extremely muscular and have very low body fat, yet still score in the 'Overweight' or even 'Obese' range. LeBron's body fat is estimated at 4–7%, which is elite athlete territory — far healthier than most people in the 'Healthy Weight' BMI range."
          />
          <AccordionItem
            ocid="athlete_case.reflection2"
            title="What health metrics might better describe athletic health?"
            explanation="Body fat percentage is the most direct replacement — it measures actual adipose tissue vs lean mass. Muscle mass ratio (lean mass as a % of total weight) captures the quality of that weight. VO₂ max (maximal oxygen uptake) is one of the best predictors of cardiovascular health and longevity. Waist-to-hip ratio and waist-to-height ratio better predict metabolic risk than BMI. Comprehensive bloodwork (HbA1c, lipid panel, CRP) captures internal health that no external measurement can. For athletes, DEXA scans provide a full body composition breakdown."
          />
        </div>
      </section>

      {/* ── BMI Limitations toggle ───────────────────────────────────── */}
      <section data-ocid="athlete_case.limitations_section">
        <div className="rounded-xl border border-border elevation-soft overflow-hidden">
          <button
            type="button"
            onClick={() => setShowLimitations((v) => !v)}
            aria-expanded={showLimitations}
            className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/30 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="athlete_case.limitations_toggle"
          >
            <div>
              <p className="font-semibold text-sm">
                Historical Context & BMI Limitations
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Why is a 19th-century formula still used today?
              </p>
            </div>
            {showLimitations ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
          </button>
          {showLimitations && (
            <div
              className="px-6 py-5 bg-muted/20 space-y-4 text-sm text-muted-foreground leading-relaxed border-t border-border"
              data-ocid="athlete_case.limitations_content"
            >
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">
                  Historical Origins
                </h4>
                <p>
                  BMI was developed by Adolphe Quetelet, a Belgian statistician,
                  in the <strong className="text-foreground">1830s</strong>. He
                  created it as a tool to describe the "average man" across
                  populations — not as a medical diagnostic for individuals.
                  Quetelet himself warned it should never be used to measure
                  individual health. His sample was exclusively white European
                  men.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">
                  Limitations for Athletes
                </h4>
                <p>
                  Athletes have high muscle mass, which weighs significantly
                  more than fat. A strength athlete with 8% body fat and a
                  sedentary person with 32% body fat can share the same BMI. BMI
                  cannot distinguish lean mass from fat mass, making it entirely
                  unreliable for athletic populations.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">
                  Limitations by Demographics
                </h4>
                <p>
                  Research shows BMI systematically{" "}
                  <strong className="text-foreground">overestimates</strong>{" "}
                  health risk in Black individuals (who tend to have denser
                  bones and more muscle) and{" "}
                  <strong className="text-foreground">underestimates</strong>{" "}
                  risk in Asian populations (who develop metabolic disease at
                  lower BMIs). Elderly patients lose muscle mass with age,
                  causing BMI to appear "healthy" while masking sarcopenia. For
                  children, age- and sex-specific percentiles must be used —
                  adult thresholds are biologically inappropriate.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm">
                  Why It Persists
                </h4>
                <p>
                  Despite these flaws, BMI remains in wide use because it
                  requires only a scale and a tape measure — no lab work,
                  imaging, or specialist. It's free, fast, and consistent enough
                  for large-scale epidemiological studies. The medical community
                  is actively working to supplement BMI with better tools, and
                  several professional organizations now explicitly caution
                  against using BMI as a sole health indicator.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Social justice note ──────────────────────────────────────── */}
      <Card
        className="border-l-4 border-l-accent bg-accent/5"
        data-ocid="athlete_case.social_justice_card"
      >
        <CardContent className="py-4">
          <p className="text-sm leading-relaxed">
            <strong className="font-semibold">Social Justice Note:</strong> BMI
            was created in the 1830s using data from white European men. It does
            not account for sex, age, ethnicity, or muscle distribution.
            Research consistently shows BMI misclassifies Black athletes, Asian
            adults, women, elderly patients, and anyone with high muscle mass —
            making it a poor and potentially harmful basis for individual health
            decisions or medical gatekeeping.
          </p>
        </CardContent>
      </Card>

      {/* ── Custom BMI Calculator ────────────────────────────────────── */}
      <BmiCalculator />
    </div>
  );
}

// ─── Tiny helper ─────────────────────────────────────────────────────────────

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={[
          "font-mono text-xs",
          highlight ? "font-semibold text-primary" : "text-foreground",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
