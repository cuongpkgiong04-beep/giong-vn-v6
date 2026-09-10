import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { ClientOnly } from "@/components/client-only";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { isAdminRole } from "@/lib/catalog";
import { CENTER_COORDS } from "@/lib/center-coords";
import { updateCenter } from "@/routes/api/employee-crud";

export const Route = createFileRoute("/trung-tam")({ component: TrungTamPage });

/**
 * Load Leaflet from CDN at runtime — same approach as Báo cáo Check-in.
 * `import("leaflet")` fails on production because vite.config.ts marks leaflet
 * as external — the browser cannot resolve the bare specifier.
 */
let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if ((window as any).L) return Promise.resolve((window as any).L);
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => resolve((window as any).L);
      script.onerror = () => {
        leafletPromise = null;
        reject(new Error("Không tải được Leaflet từ CDN"));
      };
      document.head.appendChild(script);
    });
  }
  return leafletPromise;
}

/** Leaflet map showing all 20 centers (19 trung tâm + Văn phòng) — copy pattern CheckInMap. */
function CenterMap({
  points,
  onSelect,
}: {
  points: Array<{
    code: string;
    name: string;
    short: string;
    cluster: string;
    lat: number;
    lng: number;
    staff: number;
  }>;
  onSelect?: (p: {
    code: string;
    name: string;
    short: string;
    cluster: string;
    lat: number;
    lng: number;
    staff: number;
  }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [layer, setLayer] = useState<"street" | "satellite">("street");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    loadLeaflet().then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [21.0285, 105.8542],
        zoom: 11,
        zoomControl: true,
        attributionControl: true,
      });
      // Esri World Street Map thay vì OSM — OSM chặn/throttle theo IP (GĐ 55)
      const streetLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        { attribution: "&copy; Esri", maxZoom: 19 },
      );
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "&copy; Esri", maxZoom: 18 },
      );
      streetLayer.addTo(map);
      (map as any)._streetLayer = streetLayer;
      (map as any)._satelliteLayer = satelliteLayer;

      const markers = [];
      for (const p of points) {
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        marker.bindPopup(
          `<div style="font-family:system-ui;min-width:180px">
            <p style="font-weight:600;margin:0 0 4px 0">${p.short}</p>
            <p style="font-size:12px;color:#666;margin:0 0 2px 0">${p.name}</p>
            <p style="font-size:12px;color:#666;margin:0 0 2px 0">Cụm: ${p.cluster}</p>
            <p style="font-size:12px;color:#666;margin:0 0 2px 0">GPS: ${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}</p>
            <p style="font-size:11px;color:#999;margin:2px 0 0 0">Nhân sự: ${p.staff}</p>
          </div>`,
        );
        marker.on("click", () => onSelect?.(p));
        markers.push(marker);
      }

      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
      }

      setTimeout(() => map.invalidateSize(), 200);
      mapRef.current = map;
    }).catch((err) => console.warn("[trung-tam] map init failed", err));

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [points]);

  // Handle layer toggle — Leaflet loaded from CDN
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    loadLeaflet().then((L) => {
      const streetMap = (map as any)._streetLayer;
      const satelliteMap = (map as any)._satelliteLayer;

      if (layer === "satellite") {
        if (streetMap && map.hasLayer(streetMap)) map.removeLayer(streetMap);
        if (!map.hasLayer(satelliteMap)) satelliteMap.addTo(map);
      } else {
        if (satelliteMap && map.hasLayer(satelliteMap)) map.removeLayer(satelliteMap);
        if (!map.hasLayer(streetMap)) streetMap.addTo(map);
      }
    }).catch((err) => console.warn("[trung-tam] layer toggle failed", err));
  }, [layer]);

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <p className="text-sm font-semibold text-ink">
          Bản đồ Trung tâm ({points.length} vị trí)
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setLayer("street")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              layer === "street"
                ? "bg-accent text-accent-fg"
                : "bg-surface-2 text-muted hover:bg-surface"
            }`}
          >
            Đường phố
          </button>
          <button
            type="button"
            onClick={() => setLayer("satellite")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              layer === "satellite"
                ? "bg-accent text-accent-fg"
                : "bg-surface-2 text-muted hover:bg-surface"
            }`}
          >
            Vệ tinh
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        style={{ height: "450px", width: "100%", position: "relative", zIndex: 0 }}
      />
    </Card>
  );
}

/** Editable info of a center (tọa độ KHÔNG sửa — theo file ToadoGiong). */
type CenterEdit = {
  code: string;
  name: string;
  short: string;
  city: string;
  district: string;
  address: string;
};

function TrungTamPage() {
  const centers = useAppStore((s) => s.centers);
  const employees = useAppStore((s) => s.employees);
  const currentEmployee = useAppStore(
    (s) => s.employees.find((e) => e.id === s.currentUserId) ?? null,
  );
  const isAdmin = isAdminRole(currentEmployee?.role);

  const [view, setView] = useState<"cards" | "list">("cards");
  const [detail, setDetail] = useState<CenterEdit | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const staffByCenter = useMemo(() => {
    const result: Record<string, number> = {};
    for (const e of employees) {
      result[e.center] = (result[e.center] ?? 0) + 1;
    }
    return result;
  }, [employees]);

  const mapPoints = useMemo(() => {
    return centers
      .map((c) => {
        const coord = CENTER_COORDS[c.code];
        if (!coord) return null;
        return {
          code: c.code,
          name: c.name,
          short: c.short,
          cluster: coord.cluster,
          lat: coord.lat,
          lng: coord.lng,
          staff: staffByCenter[c.code] ?? 0,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  }, [centers, staffByCenter]);

  const toEdit = useCallback(
    (code: string): CenterEdit => {
      const c = centers.find((x) => x.code === code)!;
      return {
        code: c.code,
        name: c.name,
        short: c.short,
        city: c.city,
        district: c.kind === "Văn phòng" ? "Long Biên" : CENTER_COORDS[c.code]?.cluster ?? "",
        address: "",
      };
    },
    [centers],
  );

  const openDetail = useCallback(
    (code: string) => {
      setDetail(toEdit(code));
      setEditing(false);
      setIsDetailOpen(true);
    },
    [toEdit],
  );

  // Điểm 5: tiêu đề danh sách cố định khi cuộn (callback ref — pattern GĐ 63)
  const stickyTitleRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const set = () => {
      const h = `${el.offsetHeight}px`;
      el.style.setProperty("--tt-sticky-h", h);
      el.parentElement?.style.setProperty("--tt-sticky-h", h);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
  }, []);

  async function handleSave() {
    if (!detail || !isAdmin) return;
    setSaving(true);
    try {
      await updateCenter({
        data: {
          code: detail.code,
          name: detail.name,
          short_name: detail.short,
          city: detail.city,
          district: detail.district,
          address: detail.address,
        },
      });
      toast.success(`Đã cập nhật ${detail.short}`);
      setIsDetailOpen(false);
      useAppStore.getState().hydrate(); // nạp lại centers từ Neon
    } catch (err: any) {
      toast.error(`Lưu thất bại: ${err?.message ?? err}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Danh mục" title="Trung tâm tiêm chủng" />

      {/* Điểm 5: bản đồ 20 vị trí — giống 100% bản đồ Báo cáo Check-in */}
      <div className="mb-6">
        <ClientOnly>
          <CenterMap points={mapPoints} onSelect={(p) => openDetail(p.code)} />
        </ClientOnly>
      </div>

      {/* Điểm 6: tiêu đề danh sách — cố định khi cuộn (desktop + mobile) */}
      <div ref={stickyTitleRef} className="sticky top-16 z-10 -mx-4 border-b border-line bg-bg px-4 pb-2 sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink">
            Danh sách các trung tâm tiêm chủng ({centers.length})
          </h2>
          <div className="flex rounded-lg border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => setView("cards")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                view === "cards" ? "bg-accent text-accent-fg" : "text-muted hover:text-ink"
              }`}
            >
              Thẻ
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                view === "list" ? "bg-accent text-accent-fg" : "text-muted hover:text-ink"
              }`}
            >
              Danh sách
            </button>
          </div>
        </div>
      </div>

      {/* Cards view — giữ nguyên thẻ cũ, thêm clickable mở chi tiết */}
      {view === "cards" && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {centers.map((c) => (
            <Card
              key={c.code}
              className="cursor-pointer p-4 transition hover:border-accent/40 hover:shadow-md"
              onClick={() => openDetail(c.code)}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{c.code}</p>
                  <h2 className="mt-1 font-semibold text-ink">{c.short}</h2>
                  <p className="text-sm text-muted">{c.city}</p>
                </div>
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted">{c.kind}</span>
              </div>
              <p className="mt-3 text-sm text-faint">{c.name}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-md bg-surface-2/80 py-2">
                  <dt className="text-[10px] tracking-wide text-muted uppercase">Loại</dt>
                  <dd className="text-sm font-semibold tabular">{c.kind}</dd>
                </div>
                <div className="rounded-md bg-surface-2/80 py-2">
                  <dt className="text-[10px] tracking-wide text-muted uppercase">NS</dt>
                  <dd className="text-sm font-semibold tabular">{staffByCenter[c.code] ?? 0}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      )}

      {/* List view — bảng nhiều cột, bấm dòng mở chi tiết */}
      {view === "list" && (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-3 py-2.5">STT</th>
                <th className="px-3 py-2.5">Mã</th>
                <th className="px-3 py-2.5">Tên rút gọn</th>
                <th className="px-3 py-2.5">Tên đầy đủ</th>
                <th className="px-3 py-2.5">Cụm</th>
                <th className="px-3 py-2.5">Loại</th>
                <th className="px-3 py-2.5 text-right">Số NS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {centers.map((c, i) => (
                <tr
                  key={c.code}
                  className="cursor-pointer hover:bg-surface-2/50"
                  onClick={() => openDetail(c.code)}
                >
                  <td className="px-3 py-2.5 tabular">{i + 1}</td>
                  <td className="px-3 py-2.5 font-semibold text-accent">{c.code}</td>
                  <td className="px-3 py-2.5 font-medium text-ink">{c.short}</td>
                  <td className="px-3 py-2.5 text-muted">{c.name}</td>
                  <td className="px-3 py-2.5 text-muted">{CENTER_COORDS[c.code]?.cluster ?? "—"}</td>
                  <td className="px-3 py-2.5 text-muted">{c.kind}</td>
                  <td className="px-3 py-2.5 text-right tabular">{staffByCenter[c.code] ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog chi tiết + chỉnh sửa (Admin) */}
      <Dialog open={isDetailOpen} onOpenChange={(o) => { setIsDetailOpen(o); if (!o) setEditing(false); }}>
        <DialogContent className="max-w-lg">
          {detail && (
            <>
              <DialogTitle>
                Chi tiết trung tâm: {detail.short}
              </DialogTitle>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Mã / Loại</p>
                  <p className="mt-1 text-base font-semibold text-ink">{detail.code}</p>
                  <p className="text-xs text-muted">
                    {detail.code === "VP" ? "Văn phòng" : "Trung tâm"} · GPS: {CENTER_COORDS[detail.code] ? `${CENTER_COORDS[detail.code].lat.toFixed(6)}, ${CENTER_COORDS[detail.code].lng.toFixed(6)}` : "—"}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-surface-2 p-3 sm:col-span-2">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Tên đầy đủ</p>
                    {editing ? (
                      <Input value={detail.name} onChange={(e) => setDetail({ ...detail, name: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm leading-5 text-ink">{detail.name}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-line bg-surface-2 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Tên rút gọn</p>
                    {editing ? (
                      <Input value={detail.short} onChange={(e) => setDetail({ ...detail, short: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-ink">{detail.short}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-line bg-surface-2 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Cụm</p>
                    {editing ? (
                      <Input value={detail.district} onChange={(e) => setDetail({ ...detail, district: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-ink">{detail.district || "—"}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-line bg-surface-2 p-3 sm:col-span-2">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thành phố / Quận</p>
                    {editing ? (
                      <Input value={detail.city} onChange={(e) => setDetail({ ...detail, city: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm leading-5 text-ink">{detail.city}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-line bg-surface-2 p-3 sm:col-span-2">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Địa chỉ</p>
                    {editing ? (
                      <Input value={detail.address} onChange={(e) => setDetail({ ...detail, address: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm leading-5 text-ink">{detail.address || "—"}</p>
                    )}
                  </div>
                </div>
                {isAdmin && !editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:opacity-90"
                  >
                    <Pencil className="size-4" />
                    Chỉnh sửa thông tin
                  </button>
                )}
                {isAdmin && editing && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleSave}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:opacity-90 disabled:opacity-50"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-2"
                    >
                      <X className="size-4" />
                      Hủy
                    </button>
                  </div>
                )}
                {!isAdmin && (
                  <p className="text-center text-xs text-faint">
                    Chỉ Admin mới có thể chỉnh sửa dữ liệu trung tâm.
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
