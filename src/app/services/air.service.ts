import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseNearestCity } from '../interfaces/interfacesAir';
import { environment } from 'src/environments/environment';

const AIRKEY = environment.apiKeyAir;

@Injectable({
  providedIn: 'root'
})
export class AirService {

  constructor(private http: HttpClient) { }

  getNearestCityData(){
    return this.http.get<ResponseNearestCity>(`https://api.airvisual.com/v2/nearest_city?key=${AIRKEY}`);
  }

  getNearestCityDataGps(lat: number, lng: number){
    return this.http.get<ResponseNearestCity>(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${AIRKEY}`);
  }

}
