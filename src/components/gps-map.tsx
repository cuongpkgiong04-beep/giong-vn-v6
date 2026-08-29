import { useEffect, useState, type ReactNode } from "react";

interface GpsMapProps {
  coords: [number, number] | null;
  fallback?: ReactNode;
}

/**
 * Client-only Leaflet map — dynamically imports leaflet + react-leaflet
 * to avoid SSR crashes (leaflets needs window/document).
 */
export function GpsMap({ coords, fallback }: GpsMapProps) {
  const [MapLib, setMapLib] = useState<typeof import("./gps-map-inner").GpsMapInner | null>(null);

  useEffect(() => {
    // Dynamically import the heavy leaflet modules on client only
    import("./gps-map-inner").then((mod) => setMapLib(() => mod.GpsMapInner));
  }, []);

  if (!coords) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-line bg-surface-2 text-sm text-muted">
        {fallback ?? "Đang tải bản đồ..."}
      </div>
    );
  }

  if (!MapLib) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-line bg-surface-2 text-sm text-muted animate-pulse">
        Đang tải bản đồ...
      </div>
    );
  }

  return <MapLib coords={coords} />;
}
