import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.page.html',
  styleUrls: ['./new-alert.page.scss'],
})
export class NewAlertPage implements OnInit {

  alerta: Alerta = {localizacion: '', indice: null, variable: 'aire'};

  constructor(private dataLocal: DataLocalService) { }

  ngOnInit() {
  }

  onSaveAlert() {
    let newAlert = {localizacion: this.alerta.localizacion, indice: this.alerta.indice, variable: this.alerta.variable}
    this.dataLocal.saveAlert(newAlert);
  }

  onCancel() {
    this.alerta.localizacion = '';
    this.alerta.indice = null;
  }
}
