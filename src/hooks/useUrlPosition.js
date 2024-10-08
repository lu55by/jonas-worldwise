import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  return {
    lat: parseFloat(searchParams.get("lat")),
    lng: parseFloat(searchParams.get("lng")),
  };
}
