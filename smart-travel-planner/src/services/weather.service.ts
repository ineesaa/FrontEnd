export interface WeatherNow {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  current: WeatherNow;
  forecast: ForecastDay[];
}

interface ForecastListEntry {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return null;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      ),
    ]);

    if (!currentRes.ok || !forecastRes.ok) return null;

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const current: WeatherNow = {
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed),
      description: currentData.weather[0]?.description ?? "",
      icon: currentData.weather[0]?.icon ?? "01d",
    };

    const byDate = new Map<
      string,
      { temps: number[]; description: string; icon: string }
    >();

    for (const entry of forecastData.list as ForecastListEntry[]) {
      const date = entry.dt_txt.slice(0, 10);
      const bucket = byDate.get(date) ?? {
        temps: [],
        description: entry.weather[0]?.description ?? "",
        icon: entry.weather[0]?.icon ?? "01d",
      };
      bucket.temps.push(entry.main.temp);
      if (entry.dt_txt.includes("12:00:00")) {
        bucket.description = entry.weather[0]?.description ?? bucket.description;
        bucket.icon = entry.weather[0]?.icon ?? bucket.icon;
      }
      byDate.set(date, bucket);
    }

    const forecast: ForecastDay[] = Array.from(byDate.entries())
      .slice(0, 5)
      .map(([date, bucket]) => ({
        date,
        minTemp: Math.round(Math.min(...bucket.temps)),
        maxTemp: Math.round(Math.max(...bucket.temps)),
        description: bucket.description,
        icon: bucket.icon,
      }));

    return { current, forecast };
  } catch {
    return null;
  }
}
