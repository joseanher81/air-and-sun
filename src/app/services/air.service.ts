import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseNearestCity } from '../interfaces/interfacesAir';

@Injectable({
  providedIn: 'root'
})
export class AirService {

  constructor(private http: HttpClient) { }

  getNearestCityData(){
    return this.http.get<ResponseNearestCity>(`https://api.airvisual.com/v2/nearest_city?key=6c180f94-e5c6-4c75-b82f-b00bce1e77fc`);
  }
}
