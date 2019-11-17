import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.loadAirInfo();
    this.loadSunInfo();
    this.changeBackground();
  }

  // Obtain air quality value from WS
  loadAirInfo() {
    this.airValue = 8;
  }

  // Obtain UV index from WS
  loadSunInfo(){
    this.sunValue = 10;
  }

  // Change background of air and suns sections according to measurements
  changeBackground() {
    // Air section
    if(this.airValue < 5) {
      this.airSectionColor = "green-background";
      this.airSectionFace = "good-face";
    } else if(this.airValue < 10 ) {
      this.airSectionColor = "orange-background";
      this.airSectionFace = "regular-face";
    } else {
      this.airSectionColor = "red-background";
      this.airSectionFace = "bad-face";
    }

    // Sun section
    if(this.sunValue < 5) {
      this.sunSectionColor = "green-background";
      this.sunSectionFace = "good-face";
    } else if(this.sunValue < 10 ) {
      this.sunSectionColor = "orange-background";
      this.sunSectionFace = "regular-face";
    } else {
      this.sunSectionColor = "red-background";
      this.sunSectionFace = "bad-face";
    }  
  }

}
