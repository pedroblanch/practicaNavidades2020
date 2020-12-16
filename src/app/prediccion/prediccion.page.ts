import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Dia, EstadoCielo, Municipio, Precipitacion, Prediccion, ProbPrecipitacion, RespuestaPrediccionHorariaMunicipio } from '../modelo/interfaces';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.page.html',
  styleUrls: ['./prediccion.page.scss'],
})
export class PrediccionPage implements OnInit {

  municipio:Municipio;
  diaActual:Dia;
  diaProximo:Dia;
  estadoCielo:EstadoCielo[];
  precipitacion:Precipitacion[];
  probabilidad:ProbPrecipitacion[];
  

  constructor(private apiService: ApiServiceProvider, 
    private activatedRoute: ActivatedRoute){
      this.activatedRoute.queryParams.subscribe(params => {
        this.municipio = JSON.parse(params['municipio']);
        console.log(this.municipio);
    });
  }

  ngOnInit(): void {

    this.apiService.getPrediccionHoraria(this.municipio.CPRO+this.municipio.CMUN)
      .then( (data:RespuestaPrediccionHorariaMunicipio)=> {
          //data contiene la predicción correspondiente a cada una de las 24 horas del dia actual
          //y de los dos dias siguientes
          //el campo dia es un array con tres elementos, cada uno con las predicciones de cada dia
          this.diaActual=data.prediccion.dia[0];
          this.diaProximo=data.prediccion.dia[1];
          var d = new Date();
          var hora:string = d.getHours().toString().padStart(2, "0");
          this.estadoCielo=[];
          var contador=24;
          this.diaActual.estadoCielo.forEach(element => {
            if(element.periodo>=hora && contador>0){
              this.estadoCielo.push(element);
              contador--;
            }
          });
          this.diaProximo.estadoCielo.forEach(element => {
            if(element.periodo<hora && contador>0){
              this.estadoCielo.push(element);
              contador--;
            }
          });
          this.precipitacion=[];
          this.probabilidad=[];
          var contador=24;
          this.diaActual.precipitacion.forEach(element => {
            if(element.periodo>=hora && contador>0){
              this.precipitacion.push(element);
              contador--;
              
              /*
              this.diaActual.probPrecipitacion.forEach(element2=>{
                if(element2.periodo.includes(element.periodo)){
                  this.probabilidad.push(element2);
                }
              });
              */
              
            }
          });
          this.diaProximo.precipitacion.forEach(element => {
            if(element.periodo<hora && contador>0){
              this.precipitacion.push(element);
              contador--;
              /*
              this.diaProximo.probPrecipitacion.forEach(element2=>{
                if(element2.periodo.includes(element.periodo)){
                  this.probabilidad.push(element2);
                }
              });
              */
              
            }
          });
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }

}
