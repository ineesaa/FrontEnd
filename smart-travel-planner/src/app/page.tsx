import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-display text-lg font-medium tracking-tight">
          Smart Travel Planner
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl animate-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Trip planning, mapped
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
              Every trip, laid out on one clear route.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Build the itinerary, track the budget, and see the map — from
              the morning you leave to the night you land back home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/register">Start planning</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
          </div>

          <RouteIllustration />
        </div>
      </main>

    </div>
  );
}

function RouteIllustration() {
  const stops = [
    { x: 40, y: 220, label: "Depart" },
    { x: 160, y: 90, label: "Day 2" },
    { x: 300, y: 170, label: "Day 5" },
    { x: 420, y: 60, label: "Arrive" },
  ];
  const path = `M${stops[0]?.x},${stops[0]?.y} Q140,40 ${stops[1]?.x},${stops[1]?.y} T${stops[2]?.x},${stops[2]?.y} T${stops[3]?.x},${stops[3]?.y}`;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 460 260"
        className="w-full max-w-md"
        role="img"
        aria-label="Illustration of a travel route connecting four itinerary stops"
      >
        <path
          d={path}
          fill="none"
          stroke="var(--route-line)"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeLinecap="round"
          className="animate-draw-route"
        />
        {stops.map((stop, i) => (
          <g key={stop.label}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={i === 0 || i === stops.length - 1 ? 7 : 5.5}
              className={
                i === 0 || i === stops.length - 1
                  ? "fill-accent"
                  : "fill-primary"
              }
            />
            <text
              x={stop.x}
              y={stop.y - 16}
              textAnchor="middle"
              className="fill-foreground font-mono text-[11px]"
            >
              {stop.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
