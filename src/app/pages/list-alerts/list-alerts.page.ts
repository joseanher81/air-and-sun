import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UtilsService } from 'src/app/services/utils.service'
import { NavController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.page.html',
  styleUrls: ['./list-alerts.page.scss'],
})
export class ListAlertsPage implements OnInit {

  alerts: Alerta[] = [];


  constructor(private dataLocal: DataLocalService, private navController: NavController, private utilsService:UtilsService, private localNotifications: LocalNotifications) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.alerts = await this.dataLocal.loadAlerts();
  }

  edit(alert: Alerta, index) {
    // Go to add/edit alert page
    this.navController.navigateRoot('/edit-alert', { queryParams: { i: index, loc: alert.localizacion, ind: alert.indice, var: alert.variable, lat: alert.lat, lon: alert.lon, edicion: true, animated: true }});
  }

  delete(index) {
    this.dataLocal.deleteAlert(index);
  } 

  // Checks if an alert should be fired for the current location
  checkAlerts(maxDistance = 10, currentLat, currentLon, currentAirIndex, currentUvIndex) {
    
    this.alerts.forEach((alert) => {
        // Check if the user is in the radiuos of an alert
       let distance = this.utilsService.ditanceFromTwoPoints(currentLat, currentLon, alert.lat, alert.lon);
        
       if(parseFloat(distance) < maxDistance) { // The user is inside the radius of an alert

        if(alert.variable == "Aire" && currentAirIndex > alert.indice) {
          this.sendNotification('AirSun', 'La contaminación atmosférica es superior a la alerta programada');
        }

        if(alert.variable == "UV" && currentUvIndex > alert.indice) {
          this.sendNotification('AirSun', 'La radiación ultravioleta es superior a la alerta programada');
        }
       }
    });
  }

  // Sends a notification to the user terminal
  sendNotification(titulo, texto) {
    this.localNotifications.schedule({
      title: titulo,
      text: texto,
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }
}
