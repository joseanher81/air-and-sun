import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UtilsService } from 'src/app/services/utils.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.page.html',
  styleUrls: ['./list-alerts.page.scss'],
})
export class ListAlertsPage implements OnInit {

  alerts: Alerta[] = [];


  constructor(private dataLocal: DataLocalService, private navController: NavController, private utilsService:UtilsService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.alerts = await this.dataLocal.loadAlerts();
  }

  edit(alert: Alerta, index) {
    // Go to add/edit alert page
    this.navController.navigateRoot('/edit-alert', { queryParams: { i: index, loc: alert.localizacion, ind: alert.indice, var: alert.variable, edicion: true, animated: true }});
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
          this.sendNotification();
        }

        if(alert.variable == "UV" && currentUvIndex > alert.indice) {
          this.sendNotification();
        }
       }
    });
  }

  // Sends a notification to the user terminal
  sendNotification() {
    // TODO
  }
}
