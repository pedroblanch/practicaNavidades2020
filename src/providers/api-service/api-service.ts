import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Municipio, Provincia, RespuestaPrediccionHorariaMunicipio } from 'src/app/modelo/interfaces';

@Injectable()
export class ApiServiceProvider {
    
    api_key="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZWRyb2JsYW5jaEBpZXNqdWxpb3Zlcm5lLmVzIiwianRpIjoiNzE4MDA2NjYtN2E1Yy00MjE0LWI5ZjgtOGU0YTNjMDgwMDFkIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2MDc1OTE3NTQsInVzZXJJZCI6IjcxODAwNjY2LTdhNWMtNDIxNC1iOWY4LThlNGEzYzA4MDAxZCIsInJvbGUiOiIifQ.x68Ehf6ePkgl4X-V-iQTEcrLH0CYaKPGxcf5RlL4tN0";
    URL_PREDICCION_HORARIA="https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/";

    constructor(public http: HttpClient){
    }

    getPrediccionHoraria(codigoMunicipio:string):Promise<RespuestaPrediccionHorariaMunicipio> {
        let promise = new Promise<RespuestaPrediccionHorariaMunicipio>((resolve, reject) => {
            this.http.get(this.URL_PREDICCION_HORARIA+codigoMunicipio+"?api_key="+this.api_key).toPromise()
                .then((respuesta:RespuestaPrediccionHorariaMunicipio)=>{
                    this.http.get(respuesta['datos']).toPromise()
                        .then((respuesta:RespuestaPrediccionHorariaMunicipio[])=>{
                            resolve(respuesta[0]);
                        })
                        .catch( (error:Error)=>{
                            reject(error.message);
                        });
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    getDatosProvincias():Promise<Provincia[]> {
        let promise = new Promise<Provincia[]>((resolve, reject) => {
            this.http.get('./assets/json/provincias.json').toPromise()
                .then((respuesta:Provincia[])=>{
                    resolve(respuesta);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    getDatosMunicipios(codigoProvincia:string):Promise<Municipio[]> {
        let promise = new Promise<Municipio[]>((resolve, reject) => {
            this.http.get('./assets/json/municipios.json').toPromise()
                .then((respuesta:Municipio[])=>{
                    var municipios:Municipio[]=[];
                    respuesta.forEach(municipio => {
                        if(municipio.CPRO==codigoProvincia){
                            municipios.push(municipio);
                        }
                    });
                    resolve(municipios);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    
    /*
    getAlumnos():Promise<Alumno[]> {
        let promise = new Promise<Alumno[]>((resolve, reject) => {
            this.http.get(this.URL+"/alumnos").toPromise()
                .then((data:any)=>{
                    let alumnos=new Array<Alumno>();
                    data.forEach(alumnoJson => {
                        let alumno=Alumno.createFromJsonObject(alumnoJson);
                        alumnos.push(alumno);
                    });
                    resolve(alumnos);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    

    modificarAlumno(idAlumno:number, nuevosDatosAlumno:Alumno):Promise<Alumno>{
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": {"Content-Type": "application/json"} };
            let datos = nuevosDatosAlumno.getJsonObject();
            this.http.put(this.URL+"/alumnos/"+idAlumno,
                              JSON.stringify(datos),
                              header).toPromise().then(
              (data:any) => { // Success
                let alumno:Alumno;
                    alumno=Alumno.createFromJsonObject(data);
                resolve(alumno);
              }
            )
            .catch((error:Error)=>{
              reject(error.message);});
          });
          return promise;
    }

    insertarAlumno(alumno:Alumno):Promise<Alumno>{
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": {"Content-Type": "application/json"} };
            let datos = alumno.getJsonObject();
            this.http.post(this.URL+"/alumnos",
                              JSON.stringify(datos),
                              header).toPromise().then(
              (data:any) => { // Success
                let alumo:Alumno;
                alumno=Alumno.createFromJsonObject(data);
                resolve(alumno);
              }
            )
            .catch((error:Error)=>{
              reject(error.message);});
          });
          return promise;
    }
    */

}