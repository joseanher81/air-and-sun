import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUvIndex } from '../interfaces/interfacesSun';
import { environment } from 'src/environments/environment';

const SUNKEY = environment.apiKeySun;

@Injectable({
  providedIn: 'root'
})
export class SunService {
  
  constructor(private http: HttpClient) {}

  getUvIndex(lat: number, lng: number){
    let headers = new HttpHeaders().set("x-access-token", SUNKEY);

    return this.http.get<ResponseUvIndex>(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}`, {headers});
  }
}
