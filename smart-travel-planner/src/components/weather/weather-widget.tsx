import { Droplets, Wind } from "lucide-react";
import type { WeatherNow } from "@/services/weather.service";

export function WeatherWidget({ current }: { current: WeatherNow }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
        alt={current.description}
        className="h-16 w-16"
      />
      <div>
        <p className="font-display text-3xl font-medium tracking-tight">
          {current.temperature}°C
        </p>
        <p className="text-sm capitalize text-muted-foreground">
          {current.description}
        </p>
        <p className="text-xs text-muted-foreground">
          Feels like {current.feelsLike}°C
        </p>
      </div>
      <div className="ml-auto flex flex-col gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4" />
          {current.humidity}% humidity
        </span>
        <span className="flex items-center gap-1.5">
          <Wind className="h-4 w-4" />
          {current.windSpeed} m/s wind
        </span>
      </div>
    </div>
  );
}
