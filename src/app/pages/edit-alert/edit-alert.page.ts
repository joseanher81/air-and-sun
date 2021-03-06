import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-alert',
  templateUrl: './edit-alert.page.html',
  styleUrls: ['./edit-alert.page.scss'],
})
export class EditAlertPage implements OnInit {

  alerta: Alerta = {localizacion: '', indice: null, variable: 'aire', lat: 0, lon: 0};
  i: number;

  constructor(private dataLocal: DataLocalService, private route: ActivatedRoute, private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit() {
    this.i = Number(this.route.snapshot.queryParamMap.get('i'));
    this.alerta.localizacion = this.route.snapshot.queryParamMap.get('loc');
    this.alerta.indice = Number(this.route.snapshot.queryParamMap.get('ind'));
    this.alerta.variable = this.route.snapshot.queryParamMap.get('var');
    this.alerta.lat = Number(this.route.snapshot.queryParamMap.get('lat'));
    this.alerta.lon = Number(this.route.snapshot.queryParamMap.get('lon'));
  }

  onSaveAlert() {
    let newAlert = {localizacion: this.alerta.localizacion, indice: this.alerta.indice, variable: this.alerta.variable, lat: this.alerta.lat, lon: this.alerta.lon}
    this.dataLocal.updateAlert(newAlert, this.i);
    this.navCtrl.back();
    this.presentToast("Alerta guardada");
  }

  onCancel() {
    this.navCtrl.back();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}