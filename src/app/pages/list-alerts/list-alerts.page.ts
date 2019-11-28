import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.page.html',
  styleUrls: ['./list-alerts.page.scss'],
})
export class ListAlertsPage implements OnInit {

  alerts: Alerta[] = [];


  constructor(private dataLocal: DataLocalService, private navController: NavController) { }

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

}
