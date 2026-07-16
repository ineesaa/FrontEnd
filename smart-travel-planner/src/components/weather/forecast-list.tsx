import type { ForecastDay } from "@/services/weather.service";

export function ForecastList({ forecast }: { forecast: ForecastDay[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {forecast.map((day) => (
        <div
          key={day.date}
          className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-center"
        >
          <p className="text-xs font-medium text-muted-foreground">
            {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
              new Date(day.date)
            )}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.description}
            className="h-10 w-10"
          />
          <p className="font-mono text-sm">
            <span className="font-medium">{day.maxTemp}°</span>{" "}
            <span className="text-muted-foreground">{day.minTemp}°</span>
          </p>
        </div>
      ))}
    </div>
  );
}
