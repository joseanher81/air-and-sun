import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUvIndex } from '../interfaces/interfacesSun';

@Injectable({
  providedIn: 'root'
})
export class SunService {
  
  constructor(private http: HttpClient) {}

  getUvIndex(){
    let headers = new HttpHeaders().set("x-access-token", "90788c993dd2cfa808dfe026f62f7729");

    return this.http.get<ResponseUvIndex>('https://api.openuv.io/api/v1/uv?lat=40.42&lng=-3.70', {headers});
  }
}
