import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
export default function Map() {
  const [searchParameters] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([
    40.46635901755316, -3.7133789062500004,
  ]);
  const { cities } = useCitiesContext();

  const {
    isLoading: isCurrentLocationLoading,
    error,
    currentPosition,
    getCurrentPosition,
  } = useGeolocation();

  const lat = searchParameters.get("lat");
  const lng = searchParameters.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([parseFloat(lat), parseFloat(lng)]);
  }, [lat, lng]);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPosition.lat) {
      setMapPosition([currentPosition.lat, currentPosition.lng]);
      navigate(`form?lat=${currentPosition.lat}&lng=${currentPosition.lng}`);
    }
  }, [currentPosition]);

  const isUseCurrentLocationButtonVisible =
    !currentPosition.lat || currentPosition.lat !== mapPosition[0];

  return (
    <div className={styles.mapContainer}>
      {isUseCurrentLocationButtonVisible && (
        <Button type="position" onClick={getCurrentPosition}>
          {isCurrentLocationLoading ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {currentPosition.lat && (
          <Marker position={[currentPosition.lat, currentPosition.lng]}>
            <Popup>
              <span>Your Position</span>
            </Popup>
          </Marker>
        )}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
