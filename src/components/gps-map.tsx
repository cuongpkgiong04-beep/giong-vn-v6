import { useState } from "react";
import { MapPin, Maximize2, X } from "lucide-react";

interface GpsMapProps {
  coords: [number, number] | null;
  address?: string;
  fallback?: React.ReactNode;
}

/**
 * OpenStreetMap iframe embed — no library needed, guaranteed to render.
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
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.005}%2C${lng + 0.008}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`;
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

  const mapElement = (
    <div className="relative h-44 overflow-hidden rounded-xl border border-line">
      <iframe
        title="Bản đồ vị trí chấm công"
        src={osmUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
      />
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
      {mapElement}

      {/* Fullscreen overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Vị trí chấm công</p>
              {address && (
                <p className="truncate text-xs text-muted">{address}</p>
              )}
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
          <iframe
            title="Bản đồ vị trí chấm công (phóng to)"
            src={osmFullUrl.replace("www.openstreetmap.org", "www.openstreetmap.org/export/embed.html") + `&layer=mapnik&marker=${lat}%2C${lng}`}
            className="flex-1 border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </>
  );
}
