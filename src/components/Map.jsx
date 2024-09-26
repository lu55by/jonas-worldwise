import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const lat = searchParameters.get("lat");
  const lng = searchParameters.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      {lat && (
        <>
          <p>
            Position: {lat}, {lng}
          </p>

          <button
            onClick={() =>
              setSearchParameters({
                lat: Math.random() * 1000 - 500,
                lng: Math.random() * 1000 - 500,
              })
            }
          >
            Change Position
          </button>
        </>
      )}
    </div>
  );
}
