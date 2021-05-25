import axios from "axios";
import { WeatherDataUnits } from "../types";

const config = {
  BASE_URL: "http://api.openweathermap.org/data/2.5/weather",
  API_KEY: "829a9b4ca1185a79154538b6121f0029",
};

export const get = async (
  lat: number | undefined,
  long: number | undefined,
  units: WeatherDataUnits
) => {
  try {
    console.log(`lat: ${lat} long: ${long} units:${units}`);
    const res = await axios.get(
      `${config.BASE_URL}?appid=${config.API_KEY}&lat=${lat}&lon=${long}&units=${units}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
