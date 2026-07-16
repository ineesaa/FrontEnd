"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/maps/map-view").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
        Loading map…
      </div>
    ),
  }
);

interface MapLoaderProps {
  latitude: number;
  longitude: number;
  label: string;
  description?: string;
}

export function MapLoader(props: MapLoaderProps) {
  return <MapView {...props} />;
}
