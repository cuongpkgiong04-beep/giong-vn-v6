import { useState } from "react";
import { MapPin, Maximize2, X } from "lucide-react";

interface GpsMapProps {
  coords: [number, number] | null;
  address?: string;
  fallback?: React.ReactNode;
}

/**
 * Static map image from OpenStreetMap — simple <img>, no iframe, no library.
 * Click to expand fullscreen, click X to close.
 */
export function GpsMap({ coords, address, fallback }: GpsMapProps) {
  const [expanded, setExpanded] = useState(false);

  if (!coords) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-line bg-surface-2 text-sm text-muted">
        {fallback ?? (
          <>
            <MapPin className="mr-2 size-4" />
            Đang tải bản đồ...
          </>
        )}
      </div>
    );
  }

  const [lat, lng] = coords;
  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=16&size=400x200&maptype=mapnik&markers=${lat},${lng},red-pushpin`;
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

  const mapPreview = (
    <div className="relative h-44 overflow-hidden rounded-xl border border-line bg-surface-2">
      <img
        src={staticMapUrl}
        alt={`Bản đồ vị trí ${lat}, ${lng}`}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Fallback: show coords if image fails
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Center marker overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <MapPin className="size-8 text-red-500 drop-shadow-lg" fill="currentColor" />
      </div>
      {/* Expand button */}
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg bg-white/90 shadow-md transition hover:bg-white"
        title="Phóng to bản đồ"
      >
        <Maximize2 className="size-3.5 text-ink" />
      </button>
    </div>
  );

  return (
    <>
      {mapPreview}

      {/* Fullscreen overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Vị trí chấm công</p>
              {address && (
                <p className="truncate text-xs text-muted">{address}</p>
              )}
              <p className="text-xs text-faint">{lat.toFixed(6)}, {lng.toFixed(6)}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={osmFullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg hover:opacity-90"
              >
                Mở trên OSM
              </a>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex size-8 items-center justify-center rounded-lg hover:bg-surface-2"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-surface-2 p-4">
            <img
              src={`https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=17&size=800x500&maptype=mapnik&markers=${lat},${lng},red-pushpin`}
              alt={`Bản đồ vị trí ${lat}, ${lng}`}
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
