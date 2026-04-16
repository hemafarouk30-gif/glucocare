import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type UnitSystem = "metric" | "imperial";

interface CurvePoint {
  heightCm: number;
  lower: number; // weight = 18.5 * hm^2
  upper: number; // weight = 24.9 * hm^2
  band: number; // upper - lower, for the fill band
}

interface UserPoint {
  heightCm: number;
  weightKg: number;
}

// ─── BMI helpers ──────────────────────────────────────────────────────────────

const BMI_LOWER = 18.5;
const BMI_UPPER = 24.9;
const HEIGHT_MIN_CM = 140;
const HEIGHT_MAX_CM = 210;
const WEIGHT_MIN_KG = 40;
const WEIGHT_MAX_KG = 150;

function calcBmi(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const hm = heightCm / 100;
  return weightKg / (hm * hm);
}

function ftInToCm(ft: number, inches: number): number {
  return (ft * 12 + inches) * 2.54;
}

function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

// Static design-token-aligned color map (OKLCH values resolved to sRGB hex)
// These match the OKLCH tokens from index.css converted to sRGB for Recharts/SVG compatibility.
const BMI_COLORS = {
  underweight: {
    color: "oklch(0.58 0.10 235)", // slate-blue (primary tone)
    bg: "oklch(0.95 0.03 235)",
    text: "oklch(0.38 0.12 235)",
  },
  healthy: {
    color: "oklch(0.58 0.15 166)", // teal-green (success tone)
    bg: "oklch(0.95 0.05 166)",
    text: "oklch(0.36 0.12 166)",
  },
  overweight: {
    color: "oklch(0.68 0.16 60)", // amber (warning tone)
    bg: "oklch(0.96 0.05 60)",
    text: "oklch(0.44 0.14 60)",
  },
  obese: {
    color: "oklch(0.62 0.19 24)", // coral-red (destructive tone)
    bg: "oklch(0.96 0.05 24)",
    text: "oklch(0.40 0.16 24)",
  },
} as const;

interface BmiCategoryInfo {
  label: string;
  range: string;
  color: string;
}

function getBmiCategory(bmi: number): BmiCategoryInfo {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      range: "< 18.5",
      color: BMI_COLORS.underweight.color,
    };
  if (bmi < 25)
    return {
      label: "Healthy",
      range: "18.5–24.9",
      color: BMI_COLORS.healthy.color,
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      range: "25–29.9",
      color: BMI_COLORS.overweight.color,
    };
  return { label: "Obese", range: "≥ 30", color: BMI_COLORS.obese.color };
}

// ─── Pre-compute boundary curves ─────────────────────────────────────────────

const CURVE_DATA: CurvePoint[] = Array.from(
  { length: Math.ceil((HEIGHT_MAX_CM - HEIGHT_MIN_CM) / 2) + 1 },
  (_, i) => {
    const h = HEIGHT_MIN_CM + i * 2;
    const hm = h / 100;
    const lo = Number((BMI_LOWER * hm * hm).toFixed(2));
    const hi = Number((BMI_UPPER * hm * hm).toFixed(2));
    return {
      heightCm: h,
      lower: lo,
      upper: hi,
      band: Number((hi - lo).toFixed(2)),
    };
  },
);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name?: string;
  dataKey?: string;
  value?: number;
  payload?: UserPoint & { label?: string };
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: number;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const scatterEntry = payload.find((p) => p.name === "You");
  if (scatterEntry?.payload) {
    const pt = scatterEntry.payload;
    const bmi = calcBmi(pt.weightKg, pt.heightCm);
    const cat = getBmiCategory(bmi);
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-md text-sm space-y-1">
        <p className="font-semibold text-foreground">Your position</p>
        <p className="text-muted-foreground">
          Height:{" "}
          <span className="font-mono text-foreground">
            {pt.heightCm.toFixed(1)} cm
          </span>
        </p>
        <p className="text-muted-foreground">
          Weight:{" "}
          <span className="font-mono text-foreground">
            {pt.weightKg.toFixed(1)} kg
          </span>
        </p>
        <p className="text-muted-foreground">
          BMI:{" "}
          <span className="font-mono font-bold" style={{ color: cat.color }}>
            {bmi.toFixed(1)} — {cat.label}
          </span>
        </p>
      </div>
    );
  }

  const lower = payload.find((p) => p.dataKey === "lower");
  const upper = payload.find((p) => p.dataKey === "upper");
  if (lower != null || upper != null) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-md text-sm space-y-1">
        <p className="font-semibold text-foreground">Height: {label} cm</p>
        {lower?.value != null && (
          <p className="text-muted-foreground">
            BMI 18.5:{" "}
            <span className="font-mono text-foreground">
              {lower.value.toFixed(1)} kg
            </span>
          </p>
        )}
        {upper?.value != null && (
          <p className="text-muted-foreground">
            BMI 24.9:{" "}
            <span className="font-mono text-foreground">
              {upper.value.toFixed(1)} kg
            </span>
          </p>
        )}
      </div>
    );
  }

  return null;
}

// ─── Custom scatter dot ───────────────────────────────────────────────────────

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: UserPoint;
  bmi: number;
}

function UserDot({ cx = 0, cy = 0, bmi }: DotProps) {
  const cat = getBmiCategory(bmi);
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={cat.color} fillOpacity={0.15} />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={cat.color}
        stroke="#fff"
        strokeWidth={2}
      />
      <text
        x={cx + 12}
        y={cy - 8}
        fontSize={10}
        fontWeight={600}
        fill={cat.color}
      >
        {`You (${bmi.toFixed(1)})`}
      </text>
    </g>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function BmiMapperPage() {
  const [units, setUnits] = useState<UnitSystem>("metric");

  // Metric sliders + text inputs (kept in sync)
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);

  // Imperial text inputs
  const [heightFt, setHeightFt] = useState(5);
  const [heightInch, setHeightInch] = useState(7);
  const [weightLbs, setWeightLbs] = useState(154);

  // Effective metric values
  const effHeightCm = useMemo(
    () => (units === "metric" ? heightCm : ftInToCm(heightFt, heightInch)),
    [units, heightCm, heightFt, heightInch],
  );
  const effWeightKg = useMemo(
    () => (units === "metric" ? weightKg : lbsToKg(weightLbs)),
    [units, weightKg, weightLbs],
  );

  const bmi = useMemo(
    () => calcBmi(effWeightKg, effHeightCm),
    [effWeightKg, effHeightCm],
  );
  const category = getBmiCategory(bmi);

  const handleUnitToggle = useCallback(
    (next: UnitSystem) => {
      if (next === units) return;
      if (next === "imperial") {
        const totalInches = effHeightCm / 2.54;
        setHeightFt(Math.floor(totalInches / 12));
        setHeightInch(Math.round(totalInches % 12));
        setWeightLbs(Math.round(effWeightKg / 0.453592));
      } else {
        setHeightCm(Math.round(effHeightCm));
        setWeightKg(Math.round(effWeightKg * 10) / 10);
      }
      setUnits(next);
    },
    [units, effHeightCm, effWeightKg],
  );

  // Scatter data: only show when within chart domain
  const userScatter: UserPoint[] = useMemo(() => {
    if (
      effHeightCm < HEIGHT_MIN_CM ||
      effHeightCm > HEIGHT_MAX_CM ||
      effWeightKg < WEIGHT_MIN_KG ||
      effWeightKg > WEIGHT_MAX_KG
    )
      return [];
    return [
      {
        heightCm: Number(effHeightCm.toFixed(1)),
        weightKg: Number(effWeightKg.toFixed(1)),
      },
    ];
  }, [effHeightCm, effWeightKg]);

  // Healthy range at current height
  const hm = effHeightCm / 100;
  const minHealthyKg = BMI_LOWER * hm * hm;
  const maxHealthyKg = BMI_UPPER * hm * hm;

  return (
    <div
      className="max-w-5xl mx-auto px-4 pb-10 space-y-6"
      data-ocid="bmi_mapper.page"
    >
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-semibold uppercase tracking-wider"
          >
            Critical Analyst
          </Badge>
          <span className="text-xs text-muted-foreground">
            No login required
          </span>
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground">
          BMI Inequality Mapper
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          BMI "healthy range" boundaries curve when plotted as weight vs. height
          — because BMI scales with height <em>squared</em>. Adjust your
          measurements and watch your position update live on the graph.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Controls ──────────────────────────────────────────────────── */}
        <Card
          className="elevation-soft lg:col-span-1"
          data-ocid="bmi_mapper.controls_card"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between gap-2">
              <span>Your Measurements</span>
              {/* Unit toggle */}
              <div
                className="flex items-center gap-1 bg-muted rounded-lg p-1"
                data-ocid="bmi_mapper.unit_toggle"
              >
                <Button
                  size="sm"
                  variant={units === "metric" ? "default" : "ghost"}
                  className="h-7 px-3 text-xs"
                  onClick={() => handleUnitToggle("metric")}
                  data-ocid="bmi_mapper.unit_metric_button"
                >
                  Metric
                </Button>
                <Button
                  size="sm"
                  variant={units === "imperial" ? "default" : "ghost"}
                  className="h-7 px-3 text-xs"
                  onClick={() => handleUnitToggle("imperial")}
                  data-ocid="bmi_mapper.unit_imperial_button"
                >
                  Imperial
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {units === "metric" ? (
              <>
                {/* Height — metric */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">Height</Label>
                    <span
                      className="font-mono font-semibold text-sm"
                      data-ocid="bmi_mapper.height_display"
                    >
                      {heightCm} cm
                    </span>
                  </div>
                  <Slider
                    min={HEIGHT_MIN_CM}
                    max={HEIGHT_MAX_CM}
                    step={1}
                    value={[heightCm]}
                    onValueChange={([v]) => setHeightCm(v)}
                    data-ocid="bmi_mapper.height_slider"
                  />
                  <Input
                    type="number"
                    min={HEIGHT_MIN_CM}
                    max={HEIGHT_MAX_CM}
                    value={heightCm}
                    onChange={(e) => {
                      const v = Number.parseInt(e.target.value, 10);
                      if (!Number.isNaN(v))
                        setHeightCm(
                          Math.min(Math.max(v, HEIGHT_MIN_CM), HEIGHT_MAX_CM),
                        );
                    }}
                    className="font-mono h-8 text-sm"
                    data-ocid="bmi_mapper.height_cm_input"
                  />
                </div>

                {/* Weight — metric */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">Weight</Label>
                    <span
                      className="font-mono font-semibold text-sm"
                      data-ocid="bmi_mapper.weight_display"
                    >
                      {weightKg} kg
                    </span>
                  </div>
                  <Slider
                    min={WEIGHT_MIN_KG}
                    max={WEIGHT_MAX_KG}
                    step={0.5}
                    value={[weightKg]}
                    onValueChange={([v]) => setWeightKg(v)}
                    data-ocid="bmi_mapper.weight_slider"
                  />
                  <Input
                    type="number"
                    min={WEIGHT_MIN_KG}
                    max={WEIGHT_MAX_KG}
                    step={0.5}
                    value={weightKg}
                    onChange={(e) => {
                      const v = Number.parseFloat(e.target.value);
                      if (!Number.isNaN(v))
                        setWeightKg(
                          Math.min(Math.max(v, WEIGHT_MIN_KG), WEIGHT_MAX_KG),
                        );
                    }}
                    className="font-mono h-8 text-sm"
                    data-ocid="bmi_mapper.weight_kg_input"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Height — imperial */}
                <div className="space-y-2">
                  <Label className="text-sm">Height</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <Input
                        type="number"
                        min={4}
                        max={7}
                        value={heightFt}
                        onChange={(e) => {
                          const v = Number.parseInt(e.target.value, 10);
                          if (!Number.isNaN(v)) setHeightFt(v);
                        }}
                        className="font-mono h-8 text-sm"
                        data-ocid="bmi_mapper.height_ft_input"
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        ft
                      </p>
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input
                        type="number"
                        min={0}
                        max={11}
                        value={heightInch}
                        onChange={(e) => {
                          const v = Number.parseInt(e.target.value, 10);
                          if (!Number.isNaN(v)) setHeightInch(v);
                        }}
                        className="font-mono h-8 text-sm"
                        data-ocid="bmi_mapper.height_in_input"
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        in
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ≈ {effHeightCm.toFixed(1)} cm
                  </p>
                </div>

                {/* Weight — imperial */}
                <div className="space-y-2">
                  <Label className="text-sm">Weight (lbs)</Label>
                  <Input
                    type="number"
                    min={66}
                    max={330}
                    value={weightLbs}
                    onChange={(e) => {
                      const v = Number.parseInt(e.target.value, 10);
                      if (!Number.isNaN(v)) setWeightLbs(v);
                    }}
                    className="font-mono h-8 text-sm"
                    data-ocid="bmi_mapper.weight_lbs_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    ≈ {effWeightKg.toFixed(1)} kg
                  </p>
                </div>
              </>
            )}

            {/* BMI result panel */}
            <div
              className="rounded-xl p-4 space-y-2 border bg-muted/40 border-border"
              data-ocid="bmi_mapper.result_panel"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your BMI
                </span>
                <span
                  className="font-display text-3xl font-bold leading-none"
                  style={{ color: category.color }}
                  data-ocid="bmi_mapper.bmi_value"
                >
                  {bmi > 0 ? bmi.toFixed(1) : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Category</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: category.color }}
                  data-ocid="bmi_mapper.category_label"
                >
                  {category.label}
                </span>
              </div>
              <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                Healthy at {effHeightCm.toFixed(0)} cm:{" "}
                <span className="font-mono font-semibold text-foreground">
                  {minHealthyKg.toFixed(1)}–{maxHealthyKg.toFixed(1)} kg
                </span>
              </div>
            </div>

            {/* Category legend */}
            <div className="space-y-1.5">
              {(
                [
                  {
                    label: "Underweight",
                    range: "< 18.5",
                    colorKey: "underweight",
                  },
                  { label: "Healthy", range: "18.5–24.9", colorKey: "healthy" },
                  {
                    label: "Overweight",
                    range: "25–29.9",
                    colorKey: "overweight",
                  },
                  { label: "Obese", range: "≥ 30", colorKey: "obese" },
                ] as const
              ).map((cat) => (
                <div
                  key={cat.label}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-smooth ${
                    category.label === cat.label ? "bg-muted/70" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: BMI_COLORS[cat.colorKey].color }}
                    />
                    <span
                      className={`text-xs font-medium ${category.label === cat.label ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {cat.range}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Chart ─────────────────────────────────────────────────────── */}
        <Card
          className="elevation-soft lg:col-span-2"
          data-ocid="bmi_mapper.chart_card"
        >
          <CardHeader>
            <CardTitle className="text-base">
              Weight vs. Height — BMI Boundary Curves
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              The shaded band is the BMI 18.5–24.9 healthy range. Your dot
              updates in real time.
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={360}>
              <ComposedChart
                data={CURVE_DATA}
                margin={{ top: 10, right: 24, left: 4, bottom: 24 }}
              >
                <defs>
                  <linearGradient id="healthyBand" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={BMI_COLORS.healthy.color}
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="100%"
                      stopColor={BMI_COLORS.healthy.color}
                      stopOpacity={0.06}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.90 0.01 0)"
                  vertical={false}
                />

                <XAxis
                  dataKey="heightCm"
                  type="number"
                  domain={[HEIGHT_MIN_CM, HEIGHT_MAX_CM]}
                  tickCount={8}
                  tick={{ fontSize: 11, fill: "oklch(0.48 0.01 0)" }}
                  label={{
                    value: "Height (cm)",
                    position: "insideBottom",
                    offset: -12,
                    fontSize: 12,
                    fill: "oklch(0.48 0.01 0)",
                  }}
                />
                <YAxis
                  domain={[WEIGHT_MIN_KG, WEIGHT_MAX_KG]}
                  tickCount={7}
                  tick={{ fontSize: 11, fill: "oklch(0.48 0.01 0)" }}
                  label={{
                    value: "Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 12,
                    fontSize: 12,
                    fill: "oklch(0.48 0.01 0)",
                  }}
                />

                <Tooltip content={<ChartTooltip />} />

                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ fontSize: "11px", paddingBottom: "4px" }}
                />

                {/* Lower boundary — BMI 18.5 */}
                <Area
                  type="monotone"
                  dataKey="lower"
                  name="BMI 18.5 (lower bound)"
                  stroke={BMI_COLORS.underweight.color}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  fill="transparent"
                  dot={false}
                  activeDot={false}
                  legendType="line"
                />

                {/* Upper boundary — BMI 24.9 with healthy fill */}
                <Area
                  type="monotone"
                  dataKey="upper"
                  name="Healthy Range (18.5–24.9)"
                  stroke={BMI_COLORS.healthy.text}
                  strokeWidth={2.5}
                  fill="url(#healthyBand)"
                  dot={false}
                  activeDot={false}
                  legendType="square"
                  baseValue={WEIGHT_MIN_KG}
                />

                {/* User position scatter */}
                {userScatter.length > 0 && (
                  <Scatter
                    name="You"
                    data={userScatter}
                    dataKey="weightKg"
                    line={false}
                    legendType="circle"
                    shape={(props: {
                      cx?: number;
                      cy?: number;
                      payload?: UserPoint;
                    }) => (
                      <UserDot
                        cx={props.cx}
                        cy={props.cy}
                        payload={props.payload}
                        bmi={bmi}
                      />
                    )}
                    fill={category.color}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>

            {/* Explanation */}
            <div
              className="mt-4 p-4 rounded-xl bg-muted/40 border border-border space-y-1.5"
              data-ocid="bmi_mapper.explanation_block"
            >
              <p className="text-sm font-semibold text-foreground">
                Why does the healthy region curve?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The healthy region is not a straight line — it curves because
                BMI divides weight by height squared:{" "}
                <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                  BMI = kg / m²
                </code>
                . The system of inequalities{" "}
                <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                  18.5·h² ≤ w ≤ 24.9·h²
                </code>{" "}
                defines a band that widens non-linearly as height increases.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  Critical lens:
                </span>{" "}
                BMI was derived from 19th-century data on European men. It
                cannot distinguish muscle from fat and varies meaningfully by
                sex, age, and ethnicity — yet it remains a dominant clinical
                metric.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Athlete anomaly teaser */}
      <Card
        className="bg-muted/30 border-border elevation-soft"
        data-ocid="bmi_mapper.athlete_teaser"
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-destructive/10">
              🏀
            </div>
            <div className="space-y-1 min-w-0">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                The Athlete Anomaly
              </p>
              <p className="font-display text-lg font-bold text-foreground">
                LeBron James Case Study
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LeBron James: 6′9″ (206 cm), ~113 kg. His BMI is{" "}
                <span className="font-mono font-bold text-destructive">
                  {calcBmi(113, 206).toFixed(1)}
                </span>{" "}
                — classified as{" "}
                <span className="font-semibold text-destructive">
                  {getBmiCategory(calcBmi(113, 206)).label}
                </span>{" "}
                despite being one of the world's fittest athletes. BMI cannot
                distinguish muscle mass from fat mass, making it a poor proxy
                for actual health.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
