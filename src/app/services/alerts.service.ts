import { Injectable } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UtilsService } from 'src/app/services/utils.service'
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";
import { AirService } from './air.service';
import { SunService } from './sun.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alerts: Alerta[] = [];

  constructor(private airService: AirService, private sunService: SunService, private dataLocal: DataLocalService, private utilsService:UtilsService, private localNotifications: LocalNotifications, private backgroundGeolocation: BackgroundGeolocation) { }

  // Checks if an alert should be fired for the current location
  checkAlerts(maxDistance = 5, currentLat, currentLon, currentAirIndex, currentUvIndex) {

    this.alerts.forEach((alert) => {
        // Check if the user is in the radius of an alert
       let distance = this.utilsService.ditanceFromTwoPoints(currentLat, currentLon, alert.lat, alert.lon);
        
       if(parseFloat(distance) < maxDistance) { // The user is inside the radius of an alert

        if(alert.variable == "Aire" && currentAirIndex > alert.indice) {
          this.sendNotification('AirSun', `La contaminación atmosférica en ${alert.localizacion} es superior a ${alert.indice}`);
        }

        if(alert.variable == "UV" && currentUvIndex > alert.indice) {
          this.sendNotification('AirSun', `La radiación ultravioleta en ${alert.localizacion} es superior a ${alert.indice}`);
        }
       }
    });
  }

  // Sends a notification to the user terminal
  sendNotification(titulo, texto) {
    this.localNotifications.schedule({
      title: titulo,
      text: texto,
      trigger: { in: 1, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  async startBackgroundGeolocation() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      interval: 1200000,  // check every 20 minutes
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false 
    };

    // Load alerts from DDBB
    this.alerts = await this.dataLocal.loadAlerts();
    
    // BackgroundGeolocation Cordova plugin configuration
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {

          this.airService.getNearestCityDataGps(location.latitude, location.longitude).subscribe( resp => {
      
            let airValue = resp.data.current.pollution.aqius;
            
              this.sunService.getUvIndex(location.latitude, location.longitude).subscribe( resp => {
                
                let sunValue = resp.result.uv;
                
                // Check whether current data satisfies any alert on DDBB
                this.checkAlerts(5, location.latitude, location.longitude, airValue, sunValue);

              });
        });
    });

    // start recording location
    this.backgroundGeolocation.start();

  });

  }
}
