"use client";

import { useState } from "react";
import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { haversineDistanceKm } from "@/lib/utils";

interface DistanceFromMeProps {
  latitude: number;
  longitude: number;
}

export function DistanceFromMe({ latitude, longitude }: DistanceFromMeProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleClick() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setErrorMessage("Your browser doesn't support location.");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = haversineDistanceKm(
          position.coords.latitude,
          position.coords.longitude,
          latitude,
          longitude
        );
        setDistanceKm(distance);
        setStatus("idle");
      },
      (error) => {
        setStatus("error");
        setErrorMessage(
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied."
            : "Couldn't get your location."
        );
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleClick}
        disabled={status === "loading"}
      >
        <Navigation className="h-4 w-4" />
        {status === "loading" ? "Locating…" : "Distance from me"}
      </Button>
      {distanceKm !== null && (
        <span className="text-sm text-muted-foreground">
          ~{Math.round(distanceKm).toLocaleString()} km away (straight line)
        </span>
      )}
      {status === "error" && errorMessage && (
        <span className="text-sm text-danger">{errorMessage}</span>
      )}
    </div>
  );
}
