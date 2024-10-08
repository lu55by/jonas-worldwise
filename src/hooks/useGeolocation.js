import { useState } from "react";

export function useGeolocation(callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});
  const [error, setError] = useState(null);

  function getCurrentPosition() {
    callback?.();

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    // setError("Wrong");
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, currentPosition, error, getCurrentPosition };
}
