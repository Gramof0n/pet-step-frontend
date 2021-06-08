export type WeatherDataUnits = "standard" | "metric" | "imperial";
export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Achievement_type = {
  name: string,
  requirement: number,
  is_distance: boolean
  id_achievements: number
}

export type Stats_type = {
  no_of_steps: number,
  no_of_km_walked: number,
  time_spent: string,
  user_id_user: number,
}

export type Walks_type = {
  time: string,
  date: string,
  distance: number,
  user_id_user: number,
  encoded_polyline: string
}