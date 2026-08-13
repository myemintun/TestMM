import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  category?: string;
  isHighlighted?: boolean;
}

interface InteractiveMapProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (id: string) => void;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  centerLat = 35.6762,
  centerLng = 139.6503,
  zoom = 13,
  markers = [],
  onMarkerClick,
  className = "w-full h-full min-h-[350px] rounded-2xl overflow-hidden shadow-inner border border-outline-variant/20"
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create leaflet map
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView([centerLat, centerLng], zoom);

      // Light modern tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      markerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([centerLat, centerLng], zoom);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center & markers when props change
  useEffect(() => {
    if (!mapInstanceRef.current || !markerGroupRef.current) return;

    mapInstanceRef.current.setView([centerLat, centerLng], zoom);
    markerGroupRef.current.clearLayers();

    markers.forEach((m) => {
      const isHigh = m.isHighlighted;
      
      const pinHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full ${isHigh ? 'bg-[#b72301] ring-4 ring-[#ff5733]/30 scale-110' : 'bg-[#ff5733]'} text-white shadow-lg flex items-center justify-center transition-all duration-300">
            <span class="material-symbols-outlined text-[18px]">${
              m.category === 'Dining' ? 'restaurant' : 
              m.category === 'Shopping' ? 'shopping_bag' : 
              m.category === 'Culture' ? 'museum' : 'location_on'
            }</span>
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1 bg-[#271814] text-white text-[11px] font-semibold rounded-md whitespace-nowrap shadow-md pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
            ${m.title}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-map-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const leafletMarker = L.marker([m.lat, m.lng], { icon: customIcon });

      if (m.subtitle) {
        leafletMarker.bindPopup(`
          <div class="p-1 font-['Source_Sans_3']">
            <div class="font-bold text-[#271814] text-sm">${m.title}</div>
            <div class="text-xs text-[#5b403a] mt-0.5">${m.subtitle}</div>
          </div>
        `);
      }

      leafletMarker.on('click', () => {
        if (onMarkerClick) onMarkerClick(m.id);
      });

      markerGroupRef.current?.addLayer(leafletMarker);
    });
  }, [centerLat, centerLng, zoom, markers, onMarkerClick]);

  return <div ref={mapContainerRef} className={className} />;
};
