import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";

// Example company location (Cairo, Egypt)
const companyLocation: LatLngExpression = [30.0313, 30.9934];

// Custom red marker (stable URL)
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CompanyMap: React.FC = () => {
  return (
    <div className="w-full h-80 rounded-2xl shadow-md overflow-hidden">
      <MapContainer
        scrollWheelZoom={false}
        attributionControl={false}
        center={companyLocation}
        zoom={15}
        className="w-full h-full"
      >
        {/* English map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Red marker */}
        <Marker position={companyLocation} icon={redIcon}>
          <Popup>
            📍 Our Company Location <br /> Come visit us!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CompanyMap;
