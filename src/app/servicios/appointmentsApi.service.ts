import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import '../../rxjs/index';
import '../rxjs/rxjs';
import { Appointment } from '../clases/appointment';

@Injectable()
export class AppointmentsApiService{
    
    constructor(private http: Http){}

    getAppointments(apiUrl:string): Observable<Appointment[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    addAppointment(apiUrl:string, model: Appointment): Observable<Appointment[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editAppointment(apiUrl:string, model: Appointment): Observable<Appointment[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteAppointment(apiUrl:string, model: Appointment): Observable<Appointment>{
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
        let appointments: Array<Appointment> = [];
        for(var i = 0;i<datos.length;i++) { 
          let appointment: Appointment = new Appointment(0,'','','','','');
          appointment.id = datos[i].id;
          appointment.name = datos[i].name;
          appointment.service = datos[i].service;
          appointment.employee = datos[i].employee;
          appointment.day = datos[i].day;
          appointment.hour = datos[i].hour;
          appointments.push(appointment);
        } 
        return appointments || [];
    }

    private setDato(model: Appointment){
        let datos: any = 
        {
            "name": model.name,
            "service": model.service,
            "employee": model.employee,
            "day": model.day,
            "hour": model.hour
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'appointments' + modelo;
    }

}