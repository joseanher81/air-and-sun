export interface ResponseUvIndex {
  result: Result;
}

export interface Result {
  uv: number;
  uv_time: string;
  uv_max: number;
  uv_max_time: string;
  ozone: number;
  ozone_time: string;
  safe_exposure_time: Safeexposuretime;
  sun_info: Suninfo;
}

export interface Suninfo {
  sun_times: Suntimes;
  sun_position: Sunposition;
}

export interface Sunposition {
  azimuth: number;
  altitude: number;
}

export interface Suntimes {
  solarNoon: string;
  nadir: string;
  sunrise: string;
  sunset: string;
  sunriseEnd: string;
  sunsetStart: string;
  dawn: string;
  dusk: string;
  nauticalDawn: string;
  nauticalDusk: string;
  nightEnd: string;
  night: string;
  goldenHourEnd: string;
  goldenHour: string;
}

export interface Safeexposuretime {
  st1?: any;
  st2?: any;
  st3?: any;
  st4?: any;
  st5?: any;
  st6?: any;
}