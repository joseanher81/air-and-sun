import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /** 
  *  Returns the distance between two locations 
  *  given their position coodiantes
  **/
  ditanceFromTwoPoints(lat1,lon1,lat2,lon2){
    let rad = function(x) {return x*Math.PI/180;}
    let R = 6378.137; //Earth radius in kms
    let dLong = rad( lon2 - lon1 );
    let dLat = rad( lat2 - lat1 );
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d.toFixed(2); 
  }
}
