// components/MapComponent.js
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

const cities = [
  { name: "New York", coords: [40.7128, -74.0060], info: "Population: 8.4M" },
  { name: "Los Angeles", coords: [34.0522, -118.2437], info: "Population: 4M" },
  { name: "Chicago", coords: [41.8781, -87.6298], info: "Population: 2.7M" }
];

const MapComponent = () => {
  useEffect(() => {
    // Fix for default marker icon not showing in Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((city, idx) => (
        <Marker key={idx} position={city.coords}>
          <Tooltip>{city.name}</Tooltip>
          <Popup>
            <strong>{city.name}</strong><br />
            {city.info}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
