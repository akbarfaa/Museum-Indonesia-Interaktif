import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PROVINCES } from "@/data/provinces";
import { useProgress } from "@/context/ProgressContext";
import { ClientOnly } from "@/components/ClientOnly";
import { Loader2 } from "lucide-react";

// Map province GeoJSON state names → our province IDs
const GEO_NAME_TO_ID: Record<string, string> = {
  Aceh: "aceh",
  "Sumatera Utara": "sumut",
  "Sumatera Barat": "sumbar",
  "DKI Jakarta": "jakarta",
  Jakarta: "jakarta",
  Yogyakarta: "yogya",
  "DI Yogyakarta": "yogya",
  "Jawa Timur": "jatim",
  Bali: "bali",
  "Nusa Tenggara Timur": "ntt",
  "Sulawesi Selatan": "sulsel",
  Papua: "papua",
};

function getStyleForProvince(
  geoStateName: string,
  visited: string[],
  highlight = false,
) {
  const id = GEO_NAME_TO_ID[geoStateName];
  const province = PROVINCES.find((p) => p.id === id);
  const isVisited = id ? visited.includes(id) : false;
  const hasData = !!province;

  const fillColor = isVisited
    ? "#d4a847"
    : hasData
      ? province!.color
      : "#3a3020";

  return {
    fillColor,
    fillOpacity: highlight ? 0.92 : hasData ? 0.65 : 0.22,
    color: highlight && hasData ? province!.color : hasData ? "#c8a04080" : "#60503020",
    weight: highlight ? 2.5 : hasData ? 1.5 : 0.8,
  };
}

function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const navigate = useNavigate();
  const { visited } = useProgress();

  const handleProvinceClick = useCallback(
    (geoStateName: string) => {
      const id = GEO_NAME_TO_ID[geoStateName];
      if (id) {
        navigate({ to: "/province/$provinceId", params: { provinceId: id } });
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (!mapRef.current) return;
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-2.5, 118],
        zoom: 4.5,
        zoomControl: true,
        scrollWheelZoom: true,
        minZoom: 3,
        maxZoom: 8,
        attributionControl: false,
      });

      leafletMapRef.current = map;

      // CartoDB Dark Matter
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 20,
        },
      ).addTo(map);

      L.control.attribution({ position: "bottomright" }).addTo(map);

      const response = await fetch("/indonesia-provinces.geojson");
      const geoData = await response.json();

      if (cancelled) return;

      const geoLayer = L.geoJSON(geoData, {
        style: (feature) => {
          const name: string = feature?.properties?.state ?? "";
          return getStyleForProvince(name, visited);
        },
        onEachFeature: (feature, layer) => {
          const name: string = feature?.properties?.state ?? "";
          const id = GEO_NAME_TO_ID[name];
          const province = PROVINCES.find((p) => p.id === id);

          const tooltipContent = province
            ? `<div class="nv-tooltip">
                <div class="nv-tooltip-sub">Province</div>
                <div class="nv-tooltip-title">${name}</div>
                <div class="nv-tooltip-cta" style="color:${province.color}">Click to explore →</div>
              </div>`
            : `<div class="nv-tooltip nv-tooltip-dim">${name}</div>`;

          layer.bindTooltip(tooltipContent, {
            sticky: true,
            opacity: 1,
            className: "leaflet-nv-tooltip",
          });

          layer.on({
            mouseover: (e) => {
              geoLayer.resetStyle(e.target);
              e.target.setStyle(getStyleForProvince(name, visited, true));
              e.target.bringToFront();
            },
            mouseout: (e) => {
              geoLayer.resetStyle(e.target);
            },
            click: () => handleProvinceClick(name),
          });
        },
      }).addTo(map);
    }

    initMap();

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [visited, handleProvinceClick]);

  return (
    <div
      ref={mapRef}
      style={{ height: "520px", width: "100%" }}
      className="rounded-2xl overflow-hidden"
    />
  );
}

function MapFallback() {
  return (
    <div
      className="flex items-center justify-center rounded-2xl glass"
      style={{ height: "520px" }}
    >
      <div className="flex flex-col items-center gap-3 text-ivory/60">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
        <span className="text-sm">Loading interactive map…</span>
      </div>
    </div>
  );
}

export function IndonesiaMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl glass shadow-elevated">
      <ClientOnly fallback={<MapFallback />}>
        <MapContainer />
      </ClientOnly>
      <style>{`
        .leaflet-nv-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-nv-tooltip::before {
          display: none !important;
        }
        .nv-tooltip {
          background: oklch(0.16 0.025 60 / 0.96);
          border: 1px solid oklch(0.50 0.08 80 / 0.4);
          border-radius: 12px;
          padding: 10px 16px;
          font-family: 'Cormorant Garamond', serif;
          backdrop-filter: blur(8px);
          min-width: 140px;
        }
        .nv-tooltip-dim {
          color: oklch(0.65 0.02 80);
          font-size: 13px;
          font-family: sans-serif;
        }
        .nv-tooltip-sub {
          color: oklch(0.82 0.15 85);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .nv-tooltip-title {
          color: oklch(0.96 0.015 80);
          font-size: 18px;
          font-weight: 600;
          margin-top: 2px;
          line-height: 1.2;
        }
        .nv-tooltip-cta {
          font-size: 11px;
          margin-top: 4px;
          font-family: sans-serif;
        }
        .leaflet-container {
          background: oklch(0.10 0.015 60) !important;
        }
        .leaflet-control-zoom {
          border: 1px solid oklch(0.82 0.15 85 / 0.25) !important;
          background: oklch(0.16 0.025 60 / 0.9) !important;
          border-radius: 10px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          color: oklch(0.82 0.15 85) !important;
          background: transparent !important;
          border-bottom-color: oklch(0.82 0.15 85 / 0.15) !important;
          line-height: 28px !important;
        }
        .leaflet-control-zoom a:hover {
          background: oklch(0.82 0.15 85 / 0.12) !important;
        }
        .leaflet-control-attribution {
          background: oklch(0.10 0.015 60 / 0.75) !important;
          color: oklch(0.55 0.02 80) !important;
          font-size: 9px !important;
          border-radius: 6px 0 0 0 !important;
        }
        .leaflet-control-attribution a {
          color: oklch(0.68 0.07 80) !important;
        }
      `}</style>
    </div>
  );
}
