'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, Circle } from 'react-leaflet';
import L from 'leaflet';
import * as h3 from 'h3-js';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface ServiceAreaMapInnerProps {
  lat?: number;
  lng?: number;
  serviceRadius?: number; // in miles
  providerName: string;
  city?: string;
  state?: string;
  address?: string;
}

// Convert miles to meters
function milesToMeters(miles: number): number {
  return miles * 1609.34;
}

// Get hexes that cover a circular area
function getHexesInRadius(lat: number, lng: number, radiusMiles: number, resolution: number = 6): string[] {
  const radiusKm = radiusMiles * 1.60934;
  const centerHex = h3.latLngToCell(lat, lng, resolution);

  // Get all hexes within the radius using k-ring
  // Calculate approximate k value based on radius and hex size
  const hexEdgeLength = h3.getHexagonEdgeLengthAvg(resolution, 'km');
  const k = Math.ceil(radiusKm / (hexEdgeLength * 1.5));

  const hexes = h3.gridDisk(centerHex, k);

  // Filter to only hexes whose centers are within the radius
  return hexes.filter(hex => {
    const [hexLat, hexLng] = h3.cellToLatLng(hex);
    const distance = getDistanceKm(lat, lng, hexLat, hexLng);
    return distance <= radiusKm;
  });
}

// Calculate distance between two points in km
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Geocode an address using OpenStreetMap's Nominatim API
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'Eventini-Marketplace/1.0',
        },
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export default function ServiceAreaMapInner({
  lat,
  lng,
  serviceRadius = 25,
  providerName,
  city,
  state,
  address,
}: ServiceAreaMapInnerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [geocodedLocation, setGeocodedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If no coordinates provided, try to geocode from city/state or address
  useEffect(() => {
    const hasProvidedLocation = lat != null && lng != null && lat !== 0 && lng !== 0 && !isNaN(lat) && !isNaN(lng);

    if (!hasProvidedLocation && (city || state || address)) {
      setIsGeocoding(true);
      const searchAddress = address || [city, state].filter(Boolean).join(', ');

      geocodeAddress(searchAddress).then((result) => {
        if (result) {
          setGeocodedLocation(result);
        }
        setIsGeocoding(false);
      });
    }
  }, [lat, lng, city, state, address]);

  // Check for valid coordinates from props or geocoding
  const hasProvidedLocation = lat != null && lng != null && lat !== 0 && lng !== 0 && !isNaN(lat) && !isNaN(lng);
  const hasLocation = hasProvidedLocation || geocodedLocation != null;
  const centerLat = hasProvidedLocation ? lat! : geocodedLocation?.lat || 39.8283;
  const centerLng = hasProvidedLocation ? lng! : geocodedLocation?.lng || -98.5795;

  // Calculate hexes for service area
  const hexData = useMemo(() => {
    if (!hasLocation) return [];

    const hexes = getHexesInRadius(centerLat, centerLng, serviceRadius, 6);

    return hexes.map(hex => {
      const boundary = h3.cellToBoundary(hex);
      return {
        hex,
        boundary: boundary.map(([lat, lng]) => [lat, lng] as [number, number]),
      };
    });
  }, [centerLat, centerLng, serviceRadius, hasLocation]);

  // Custom marker icon
  const markerIcon = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        background: #44646c;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, []);

  if (!isMounted || isGeocoding) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#44646c] rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">{isGeocoding ? 'Finding location...' : 'Loading map...'}</p>
        </div>
      </div>
    );
  }

  if (!hasLocation) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Service area covers</p>
          <p className="text-lg font-semibold text-gray-900">{serviceRadius} miles</p>
          {(city || state) && (
            <p className="text-sm text-gray-500 mt-1">from {[city, state].filter(Boolean).join(', ')}</p>
          )}
        </div>
      </div>
    );
  }

  // Calculate zoom level based on service radius (higher number = more zoomed in)
  const getZoomFromRadius = (radius: number): number => {
    if (radius <= 10) return 9;
    if (radius <= 25) return 8;
    if (radius <= 50) return 7;
    if (radius <= 100) return 6;
    return 5;
  };

  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden" style={{ zIndex: 0 }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={getZoomFromRadius(serviceRadius)}
        className="h-full w-full"
        style={{ background: '#f5f5f5' }}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* H3 Hexagons for service area */}
        {hexData.map(({ hex, boundary }) => (
          <Polygon
            key={hex}
            positions={boundary}
            pathOptions={{
              fillColor: '#44646c',
              fillOpacity: 0.15,
              color: '#44646c',
              weight: 1,
              opacity: 0.4,
            }}
          />
        ))}

        {/* Service radius circle outline */}
        <Circle
          center={[centerLat, centerLng]}
          radius={milesToMeters(serviceRadius)}
          pathOptions={{
            fillColor: 'transparent',
            fillOpacity: 0,
            color: '#44646c',
            weight: 2,
            dashArray: '8, 8',
            opacity: 0.6,
          }}
        />

        {/* Provider location marker */}
        {markerIcon && (
          <Marker position={[centerLat, centerLng]} icon={markerIcon} />
        )}
      </MapContainer>

      {/* Service radius badge */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md z-[10]">
        <p className="text-xs text-gray-500">Service area</p>
        <p className="text-sm font-semibold text-gray-900">{serviceRadius} mile radius</p>
      </div>
    </div>
  );
}
