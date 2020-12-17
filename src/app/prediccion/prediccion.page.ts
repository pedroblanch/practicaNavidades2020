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
  probabilidad:any[];

  constructor(private apiService: ApiServiceProvider, 
    private activatedRoute: ActivatedRoute){
      this.activatedRoute.queryParams.subscribe(params => {
        this.municipio = JSON.parse(params['municipio']);
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
          var hora:number = d.getHours();
          this.estadoCielo=[];
          var contador=24;
          this.diaActual.estadoCielo.forEach(element => {
            if(Number(element.periodo)>=hora && contador>0){
              this.estadoCielo.push(element);
              contador--;
            }
          });
          this.diaProximo.estadoCielo.forEach(element => {
            if(contador>0){
              this.estadoCielo.push(element);
              contador--;
            }
          });

          //creo el array de 24 elementos con las precipitaciones de cada hora
          this.precipitacion=[];
          var contador=24;
          this.diaActual.precipitacion.forEach(element => {
            if(Number(element.periodo)>=hora && contador>0){
              this.precipitacion.push(element);
              contador--;
            }
          });//end_forEach
          this.diaProximo.precipitacion.forEach(element => {
            if(contador>0){
              this.precipitacion.push(element);
              contador--;
            }//end_if
          });//end_forEach

          //creo el array de 24 elementos con la probabilidad de precipitación para cada hora
          this.probabilidad=[];
          var contador:number=24;
          this.diaActual.probPrecipitacion.forEach(element2=>{
            var horaDesde=Number(element2.periodo.substring(0,2));
            var horaHasta=Number(element2.periodo.substring(2,4));
            var horaAux;
            if(horaDesde<horaHasta){
              for(horaAux=horaDesde;horaAux<horaHasta;horaAux++){
                if(hora<=horaAux){
                  this.probabilidad.push({"hora":horaAux,
                    "value":element2.value});
                  contador--;
                }
              }
            }
            else{  //es un intervalo del tipo de 19 a 01
              for(horaAux=horaDesde;horaAux<=24;horaAux++){
                if(hora<=horaAux){
                  if(horaAux==24)
                    this.probabilidad.push({"hora":0,
                      "value":element2.value});
                  else
                    this.probabilidad.push({"hora":horaAux,
                      "value":element2.value});
                  contador=contador--;
                }
              }
            }//end_if
          });//end_forEach
          this.diaProximo.probPrecipitacion.forEach(element2=>{
            var horaDesde=Number(element2.periodo.substring(0,2));
            var horaHasta=Number(element2.periodo.substring(2,4));
            var horaAux;
            if(horaDesde<horaHasta){
              for(horaAux=horaDesde;horaAux<horaHasta;horaAux++){
                if(hora>horaAux && contador>0){
                  this.probabilidad.push({"hora":horaAux,
                    "value":element2.value});
                  contador--;
                }
              }
            }
            else{  //es un intervalo del tipo de 19 a 01
              for(horaAux=horaDesde;horaAux<=23;horaAux++){
                if(hora>horaAux && contador>0){
                  this.probabilidad.push({"hora":horaAux,
                    "value":element2.value});
                  contador--;
                }
              }
            }//end_if
          });//end_forEach
          console.log(this.probabilidad);
          
      })//end_.then
      .catch( (error:string) => {
          console.log(error);
      });
  }

}
