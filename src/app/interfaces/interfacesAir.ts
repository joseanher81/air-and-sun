export interface ResponseNearestCity {
  status: string;
  data: Data;
}

export interface Data {
  city: string;
  state: string;
  country: string;
  location: Location;
  current: Current;
}

export interface Current {
  weather: Weather;
  pollution: Pollution;
}

export interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export interface Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}