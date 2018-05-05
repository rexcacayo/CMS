import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Service } from '../clases/service';
import { Employee } from '../clases/employee';

@Injectable()
export class ServicesApiService{
    
    constructor(private http: Http){}

    getServices(apiUrl:string): Observable<Service[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    getService(apiUrl:string, id:number): Observable<Service>{
        return this.http.get(this.getUrl(apiUrl, '/' + id)).map(this.getDato).catch(this.error);
    }

    addService(apiUrl:string, model: Service): Observable<Service[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editService(apiUrl:string, model: Service): Observable<Service[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteService(apiUrl:string, model: Service): Observable<Service>{
        return this.http.delete(this.getUrl(apiUrl, '/' + model.id)).catch(this.error);
    }

    private error(error: any){
        console.log(error);
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
        return Observable.throw(msg);
    }

    private getDatos(data: Response){
        let datos = data.json()['data'];
        let services: Array<Service> = [];
        for(var i = 0;i<datos.length;i++) { 
          let service: Service = new Service(0,'',Array<Employee>(), false);
          service.id = datos[i].id;
          service.name = datos[i].name;
          service.employees = datos[i].employees;
          services.push(service);
        } 
        return services || [];
    }

    private getDato(data: Response){
        let datos = data.json()['data'];
        let service: Service = new Service(0,'',Array<Employee>(), false);
        service.id = datos.id;
        service.name = datos.name;
        service.employees = datos.employees;
        return service;
    }

    private setDato(model: Service){
        let datos: any = 
        {
            "name": model.name,
            "employees": model.employees
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'services' + modelo;
    }

}