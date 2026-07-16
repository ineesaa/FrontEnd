interface GeocodeResult {
  latitude: number;
  longitude: number;
}

export async function geocodePlace(query: string): Promise<GeocodeResult | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "SmartTravelPlanner/1.0 (graduation project)",
      },
    });
    if (!response.ok) return null;

    const results = await response.json();
    const first = results?.[0];
    if (!first) return null;

    const latitude = parseFloat(first.lat);
    const longitude = parseFloat(first.lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return { latitude, longitude };
  } catch {
    return null;
  }
}
