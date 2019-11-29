import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaces/interfacesAlert';
import { DataLocalService } from 'src/app/services/data-local.service';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.page.html',
  styleUrls: ['./new-alert.page.scss'],
})
export class NewAlertPage implements OnInit {

  alerta: Alerta = {localizacion: '', indice: null, variable: 'aire', lat: 0, lon: 0};

  constructor(private dataLocal: DataLocalService, private locationService: LocationService) { }

  ngOnInit() {
  }

  onSaveAlert() {
    
    let latitude;
    let longitude;

    this.locationService.getGeocode(this.alerta.localizacion).subscribe( resp => {
      
      // Obtain coordinates for location
      latitude = resp.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      longitude = resp.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
      latitude = Math.round(latitude * 100) / 100;
      longitude = Math.round(longitude * 100) / 100;

      // Add new alert with all data
      let newAlert = {localizacion: this.alerta.localizacion, indice: this.alerta.indice, variable: this.alerta.variable, lat: latitude, lon: longitude}
      this.dataLocal.saveAlert(newAlert);
    });
  }

  onCancel() {
    this.alerta.localizacion = '';
    this.alerta.indice = null;
  }
}
