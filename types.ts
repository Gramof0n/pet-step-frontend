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

export type UserProfile_type = {
  img_url: string;
  name: string;
  surname: string;
  pet_name: string;
};

export type ProfileData_type = {
  id_user: number;
  username: string;
  email: string;
  password: string;
  user_profile: UserProfile_type;
  achievements: Achievement_type;
};
export type Achievement_type = {
  name: string;
  requirement: number;
  is_distance: boolean;
  id_achievements: number;
};
