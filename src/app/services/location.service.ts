import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseLocation } from '../interfaces/interfaceLocation';

const APPCODE = environment.apiCodeHere;
const APPID = environment.apiIdHere;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getGeocode(place: string){
    return this.http.get<ResponseLocation>(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${place}&app_id=${APPID}&app_code=${APPCODE}&gen=9`);
  }
}
