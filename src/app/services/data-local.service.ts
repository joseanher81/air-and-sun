import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Alerta } from '../interfaces/interfacesAlert';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  alerts: Alerta[] = [];

  constructor(private storage: Storage) { }

  saveAlert(alert: Alerta){

    // Avoids duplicating alerts
    let exists = false;
    this.alerts.forEach(function(bbddAlert) {
      if(bbddAlert.localizacion == alert.localizacion && bbddAlert.indice == alert.indice && bbddAlert.variable == alert.variable){
        exists = true;
      }
    });

    // If the alerts is not on DDBB yet it is added
    if(!exists) {
      this.alerts.push(alert);
      this.storage.set('alerts', this.alerts);
    }

  }

  async loadAlerts() {

    const alerts = await this.storage.get('alerts');
    this.alerts = alerts || [];
    return this.alerts;
  }

  deleteAlert(i) {
    console.log('deleting alert ', i);
    this.alerts.splice(i, 1);
    this.storage.set('alerts', this.alerts);
  }

  updateAlert(alert: Alerta, i: number){
    console.log("updating alert", alert, i)
    this.alerts[i] = alert;
    this.storage.set('alerts', this.alerts);
  }
}
