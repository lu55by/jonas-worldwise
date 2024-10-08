// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useMemo, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [isGeoLocationLoading, setisGeoLocationLoading] = useState(false);
  const [geoLocErrorMsg, setGeoLocErrorMsg] = useState("");
  const [emoji, setEmoji] = useState("");

  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setisGeoLocationLoading(true);
        setGeoLocErrorMsg("");
        const resp = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await resp.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "This is not a country, try selecting other places on the map."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoLocErrorMsg(error.message);
      } finally {
        setisGeoLocationLoading(false);
      }
    };
    fetchCity();
  }, [lat, lng]);

  if (isGeoLocationLoading) return <Spinner />;
  if (geoLocErrorMsg) return <Message message={geoLocErrorMsg} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
