# Design Brief: GlucoCare

**Purpose** — Diabetes patient blood glucose tracking and critical health literacy. Clinical yet humane; medically precise without sterile aesthetics.

**Tone** — Trustworthy, calm, educational. Not playful, not intimidating. Data-respecting and patient-centric.

**Palette**

| Role | OKLCH | Purpose |
|------|-------|---------|
| Primary | 0.58 0.15 166 | Slate blue; trust, data integrity |
| Secondary | 0.56 0.18 134 | Deeper blue; hierarchy, secondary actions |
| Accent | 0.62 0.19 24 | Coral red; critical readings, non-alarmist distinction |
| Success (chart-1) | 0.58 0.15 166 | Primary blue for data series |
| Muted | 0.92 0.01 0 | Light neutral; reduced emphasis |
| Background | 0.98 0.01 0 | Near-white with warmth; not sterile |
| Foreground | 0.22 0.02 0 | Deep slate for text; not pure black |

**Typography**

| Layer | Font | Usage |
|-------|------|-------|
| Display | Fraunces (serif) | Headings, section titles; warm sophistication |
| Body | Figtree (sans) | Content, labels, descriptions; warm humanness |
| Data | JetBrains Mono | Glucose values, timestamps; precision & credibility |

**Shape & Spacing**

- Border radius: 0.5rem (8px) for cards and inputs; soft, approachable
- Spacing scale: 0.5rem, 1rem, 1.5rem, 2rem, 3rem — generous breathing room
- Density: Loose (healthcare prioritizes clarity over information density)

**Structural Zones**

| Zone | Background | Border | Elevation | Purpose |
|------|------------|--------|-----------|---------|
| Header | `bg-card` | `border-b` | Soft shadow | Navigation, branding |
| Main content | `bg-background` | None | None | Primary glucose tracking |
| Data cards | `bg-card` | Subtle `border` | Soft shadow | Reading history, stats |
| Forms | `bg-muted/20` | `border` | None | Input areas |
| Footer | `bg-muted/5` | `border-t` | None | Secondary info |
| Critical Analyst | `bg-background` | None | None | Open/public section |

**Component Patterns**

- **Buttons**: Primary (slate blue, solid), Secondary (muted, outline), Destructive (coral red)
- **Inputs**: Light background `bg-input`, slate blue focus ring
- **Tables**: Minimal borders, alternating subtle row backgrounds
- **Charts**: Multi-series using chart color tokens; slate blue dominant
- **Cards**: Soft elevation, rounded corners, breathing room

**Motion**

- Default transition: 0.3s cubic-bezier (smooth, not snappy)
- No bouncing or playful easing
- Fade-in for data loading

**Anti-Patterns Rejected**

- No gradient backgrounds (clinical, not trendy)
- No bright healthcare greens (cliché, boring)
- No sterile white (warm background chosen)
- No generic Tailwind blue (custom palette chosen)

**Signature Detail**

Critical Analyst section is public/unauthenticated — health literacy as open educational content, not gatekept behind login. BMI graph interactive exploration signals the app's commitment to questioning health norms.
