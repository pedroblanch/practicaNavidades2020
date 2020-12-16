import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Dia, EstadoCielo, Municipio, Precipitacion, Prediccion, Provincia, RespuestaPrediccionHorariaMunicipio } from '../modelo/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  municipio:string;
  provincia:string;
  prediccion:Prediccion;
  dia:Dia;
  estadoCielo:EstadoCielo[];
  precipitacion:Precipitacion[];
  provincias:Provincia[];
  municipios:Municipio[];

  constructor(private apiService: ApiServiceProvider,
    public navCtrl: NavController) {}

  ngOnInit(): void {

      this.apiService.getDatosProvincias()
      .then( (data:Provincia[])=> {
          this.provincias=data;
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }

  onClickProvincia(provincia:Provincia){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          provincia: JSON.stringify(provincia)
      }
    };
    this.navCtrl.navigateForward('/municipios', navigationExtras);
  }

}
