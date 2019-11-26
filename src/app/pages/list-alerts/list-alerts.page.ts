import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.page.html',
  styleUrls: ['./list-alerts.page.scss'],
})
export class ListAlertsPage implements OnInit {

  alerts: Alerta[] = [];


  constructor(private dataLocal: DataLocalService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.alerts = await this.dataLocal.loadAlerts();
  }

  edit(alert) {
    console.log('editing', alert)
  }

  delete(index) {
    this.dataLocal.deleteAlert(index);
  } 

}
