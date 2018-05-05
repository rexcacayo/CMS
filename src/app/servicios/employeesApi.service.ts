import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Service } from '../clases/service';
import { Employee } from '../clases/employee';

@Injectable()
export class EmployeesApiService{
    
    constructor(private http: Http){}

    getEmployees(apiUrl:string): Observable<Employee[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    getEmployee(apiUrl:string, id:number): Observable<Employee>{
        return this.http.get(this.getUrl(apiUrl, '/' + id)).map(this.getDato).catch(this.error);
    }

    addEmployee(apiUrl:string, model: Employee): Observable<Employee[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editEmployee(apiUrl:string, model: Employee): Observable<Employee[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteEmployee(apiUrl:string, model: Employee): Observable<Employee>{
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
        let employees: Array<Employee> = [];
        for(var i = 0;i<datos.length;i++) { 
          let employee: Employee = new Employee(0,'',Array<Service>(),false);
          employee.id = datos[i].id;
          employee.name = datos[i].name;
          employee.services = datos[i].services;
          employees.push(employee);
        } 
        return employees || [];
    }

    private getDato(data: Response){
        let datos = data.json()['data'];
        let employee: Employee = new Employee(0,'',Array<Service>(),false);
        employee.id = datos.id;
        employee.name = datos.name;
        employee.services = datos.services;
        return employee;
    }

    private setDato(model: Employee){
        let datos: any = 
        {
            "name": model.name,
            "services": model.services
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'employees' + modelo;
    }

}