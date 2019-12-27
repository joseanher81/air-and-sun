import { Component, OnInit } from '@angular/core';
import { AirService } from 'src/app/services/air.service';
import { SunService } from 'src/app/services/sun.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  sunValue: number;
  airValue: number;
  airSectionColor: string;
  sunSectionColor: string;
  airSectionFace: string;
  sunSectionFace: string;
  longitud: number;
  latitud: number;

  constructor(private airService: AirService, private sunService: SunService, private geolocation: Geolocation, private alertsService: AlertsService) { }

  ngOnInit() {
    // Obtain device location
    this.getLocation();

    // Init alerts service
    this.alertsService.startBackgroundGeolocation();
  }

  // Obtain air quality value from WS
  loadAirInfo() {
    this.airService.getNearestCityDataGps(this.latitud, this.longitud).subscribe( resp => {
      
      this.airValue = resp.data.current.pollution.aqius;
      console.log(`Consulted airService with gps for lat ${this.latitud} and long ${this.longitud} with result ${this.airValue}`);
      this.changeBackground(); // updates background

    });
  }

  // Obtain UV index from WS
  loadSunInfo(){
    this.sunService.getUvIndex(this.latitud, this.longitud).subscribe( resp => {
      
      this.sunValue = resp.result.uv;
      console.log(`Consulted sunService for lat ${this.latitud} and long ${this.longitud} with result ${this.sunValue}`);
      this.changeBackground(); // updates background

    });
  }

  // Change background of air and suns sections according to measurements
  changeBackground() {
    // Air section
    if(this.airValue <= 50) {
      this.airSectionColor = "green-background";
      this.airSectionFace = "good-face";
    } else if(this.airValue <= 100 ) {
      this.airSectionColor = "orange-background";
      this.airSectionFace = "regular-face";
    } else {
      this.airSectionColor = "red-background";
      this.airSectionFace = "bad-face";
    }

    // Sun section
    if(this.sunValue <= 3) {
      this.sunSectionColor = "green-background";
      this.sunSectionFace = "good-face";
    } else if(this.sunValue <= 6 ) {
      this.sunSectionColor = "orange-background";
      this.sunSectionFace = "regular-face";
    } else {
      this.sunSectionColor = "red-background";
      this.sunSectionFace = "bad-face";
    }  
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;

      // Call to air pollution web service
      this.loadAirInfo();

      // Call to UV index web service
      this.loadSunInfo();

      console.log(`Latitud ${this.latitud} Longitud ${this.longitud}`);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
