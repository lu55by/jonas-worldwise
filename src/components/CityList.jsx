import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CityList({ cities, isLoading }) {
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
