import { useEffect, useRef, useState } from "react";
import type { Attendance } from "@/lib/types";
import { MapPin, Satellite, Map } from "lucide-react";

interface AttendanceMapProps {
  records: Attendance[];
  selectedCenter?: string | null;
}

/**
 * Parse GPS string "lat, lng" to [lat, lng] numbers.
 * Returns null if invalid.
 */
function parseGps(gps: string): [number, number] | null {
  if (!gps || gps === "0.000000, 0.000000") return null;
  const parts = gps.split(",").map((s) => parseFloat(s.trim()));
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  if (parts[0] === 0 && parts[1] === 0) return null;
  // Validate reasonable bounds for Vietnam
  if (parts[0] < 8 || parts[0] > 24 || parts[1] < 100 || parts[1] > 110) return null;
  return [parts[0], parts[1]];
}

const STREET_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

export function AttendanceMap({ records, selectedCenter }: AttendanceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const tileLayerRef = useRef<any>(null);
  const [view, setView] = useState<"street" | "satellite">("street");

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamic import to avoid SSR issues with Leaflet
    (async () => {
      const L = (await import("leaflet")).default;

      // Fix default marker icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [21.0, 105.8], // Vietnam center
        zoom: 11,
        zoomControl: true,
      });

      // Add initial tile layer
      tileLayerRef.current = L.tileLayer(STREET_URL, {
        attribution: '&copy; <a href="https://openstreetmap.org">OSM</a>',
        maxZoom: 19,
      }).addTo(map);

      leafletMapRef.current = map;

      // Force resize after mount
      setTimeout(() => map.invalidateSize(), 100);
    })();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Switch tile layer
  useEffect(() => {
    if (!leafletMapRef.current) return;
    const L = require("leaflet");
    const map = leafletMapRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const url = view === "satellite" ? SATELLITE_URL : STREET_URL;
    const attribution =
      view === "satellite"
        ? '&copy; <a href="https://www.esri.com/">Esri</a>'
        : '&copy; <a href="https://openstreetmap.org">OSM</a>';

    tileLayerRef.current = L.tileLayer(url, {
      attribution,
      maxZoom: 19,
    }).addTo(map);
  }, [view]);

  // Update markers
  useEffect(() => {
    if (!leafletMapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      const map = leafletMapRef.current;

      // Clear old markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Filter records with valid GPS
      const validRecords = records.filter((r) => parseGps(r.gps) !== null);

      if (validRecords.length === 0) return;

      const bounds = L.latLngBounds([]);

      // Custom icons
      const greenIcon = L.divIcon({
        className: "",
        html: `<div style="background:#16a34a;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const redIcon = L.divIcon({
        className: "",
        html: `<div style="background:#dc2626;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      for (const r of validRecords) {
        const pos = parseGps(r.gps);
        if (!pos) continue;

        const isIn = r.status.includes("vào");
        const icon = isIn ? greenIcon : redIcon;

        const marker = L.marker(pos, { icon })
          .bindPopup(
            `<div style="min-width:180px">
              <div style="font-weight:600;margin-bottom:4px">${r.name}</div>
              <div style="font-size:12px;color:#666">
                <div>${isIn ? "🟢 Vào ca" : "🔴 Tan ca"}</div>
                <div>🕐 ${r.time} — ${r.date}</div>
                <div>📍 ${r.gps}</div>
                ${r.address ? `<div style="margin-top:2px;color:#999">${r.address.slice(0, 60)}</div>` : ""}
              </div>
            </div>`,
          )
          .addTo(map);

        markersRef.current.push(marker);
        bounds.extend(pos);
      }

      // Fit map to show all markers
      if (markersRef.current.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      }
    })();
  }, [records, selectedCenter]);

  const validCount = records.filter((r) => parseGps(r.gps) !== null).length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line">
      {/* Toggle buttons */}
      <div className="absolute right-3 top-3 z-[1000] flex gap-1 rounded-lg bg-surface p-1 shadow-lg">
        <button
          type="button"
          onClick={() => setView("street")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            view === "street"
              ? "bg-forest text-forest-fg"
              : "text-muted hover:text-ink"
          }`}
        >
          <Map className="size-3.5" />
          Đường phố
        </button>
        <button
          type="button"
          onClick={() => setView("satellite")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            view === "satellite"
              ? "bg-forest text-forest-fg"
              : "text-muted hover:text-ink"
          }`}
        >
          <Satellite className="size-3.5" />
          Vệ tinh
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-3 rounded-lg bg-surface/90 px-3 py-2 text-xs shadow-lg backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-full bg-green-600" />
          <span className="text-muted">Vào ca</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-full bg-red-600" />
          <span className="text-muted">Tan ca</span>
        </div>
        <span className="text-faint">|</span>
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-muted" />
          <span className="text-muted">{validCount} vị trí</span>
        </div>
      </div>

      {/* Map container */}
      <div ref={mapRef} className="h-[420px] w-full" />
    </div>
  );
}
