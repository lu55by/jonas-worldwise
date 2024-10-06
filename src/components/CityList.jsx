import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CityList() {
  const { isLoading, cities } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Please add your cities first." />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem city={city} key={i} />
      ))}
    </ul>
  );
}
