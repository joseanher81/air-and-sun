import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-alert',
  templateUrl: './edit-alert.page.html',
  styleUrls: ['./edit-alert.page.scss'],
})
export class EditAlertPage implements OnInit {

  alerta: Alerta = {localizacion: '', indice: null, variable: 'aire', lat: 0, lon: 0};
  i: number;

  constructor(private dataLocal: DataLocalService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.i = Number(this.route.snapshot.queryParamMap.get('i'));
    this.alerta.localizacion = this.route.snapshot.queryParamMap.get('loc');
    this.alerta.indice = Number(this.route.snapshot.queryParamMap.get('ind'));
    this.alerta.variable = this.route.snapshot.queryParamMap.get('var');
  }

  onSaveAlert() {
    //TODO revisar lat y lon
    let newAlert = {localizacion: this.alerta.localizacion, indice: this.alerta.indice, variable: this.alerta.variable, lat: 0, lon: 0}
    this.dataLocal.updateAlert(newAlert, this.i);
    this.navCtrl.back();
  }

  onCancel() {
    this.navCtrl.back();
  }

}