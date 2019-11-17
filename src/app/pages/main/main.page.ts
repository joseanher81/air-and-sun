import { Component, OnInit } from '@angular/core';
import { AirService } from 'src/app/services/air.service';
import { SunService } from 'src/app/services/sun.service';

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

  constructor(private airService: AirService, private sunService: SunService) { }

  ngOnInit() {
    this.loadAirInfo();
    this.loadSunInfo();
    //this.changeBackground();
  }

  // Obtain air quality value from WS
  loadAirInfo() {
    this.airService.getNearestCityData().subscribe( resp => {

      this.airValue = resp.data.current.pollution.aqius;
      this.changeBackground();

    });
  }

  // Obtain UV index from WS
  loadSunInfo(){
    this.sunService.getUvIndex().subscribe( resp => {
      
      this.sunValue = resp.result.uv;
      this.changeBackground();

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

}
