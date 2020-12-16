import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Municipio, Provincia } from '../modelo/interfaces';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.page.html',
  styleUrls: ['./municipios.page.scss'],
})
export class MunicipiosPage implements OnInit {

  municipios:Municipio[];
  provincia:Provincia;

  constructor(private apiService: ApiServiceProvider, 
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.provincia = JSON.parse(params['provincia']);
    });
  }

  ngOnInit(): void {

      this.apiService.getDatosMunicipios(this.provincia.CPRO)
      .then( (data:Municipio[])=> {
          this.municipios=data;
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }//end_ngOnInit

  onClickMunicipio(municipio:Municipio){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          municipio: JSON.stringify(municipio)
      }
    };
    this.navCtrl.navigateForward('/prediccion', navigationExtras);
  }

}//end_class