import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Hour } from '../clases/hour';

@Injectable()
export class HoursApiService{
    
    constructor(private http: Http){}

    getHours(apiUrl:string): Observable<Hour[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    getHour(apiUrl:string, id:number): Observable<Hour>{
        return this.http.get(this.getUrl(apiUrl, '/' + id)).map(this.getDato).catch(this.error);
    }

    addHour(apiUrl:string, model: Hour): Observable<Hour[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editHour(apiUrl:string, model: Hour): Observable<Hour[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteHour(apiUrl:string, model: Hour): Observable<Hour>{
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
        let hours: Array<Hour> = [];
        for(var i = 0;i<datos.length;i++) { 
          let hour: Hour = new Hour(0,'','','','','');
          hour.id = datos[i].id;
          hour.day = datos[i].day;
          hour.timeStartMorning = datos[i].time_start_morning;
          hour.timeEndMorning = datos[i].time_end_morning;
          hour.timeStartAfternoon = datos[i].time_start_afternoon;
          hour.timeEndAfternoon = datos[i].time_end_afternoon;
          hours.push(hour);
        } 
        return hours || [];
    }

    private getDato(data: Response){
        let datos = data.json()['data'];
        let hour: Hour = new Hour(0,'','','','','');
        hour.id = datos.id;
        hour.day = datos.day;
        hour.timeStartMorning = datos.time_start_morning;
        hour.timeEndMorning = datos.time_end_morning;
        hour.timeStartAfternoon = datos.time_start_afternoon;
        hour.timeEndAfternoon = datos.time_end_afternoon;
        return hour;
    }

    private setDato(model: Hour){
        let datos: any = 
        {
            "day": model.day,
            "time_start_morning": model.timeStartMorning,
            "time_end_morning": model.timeEndMorning,
            "time_start_afternoon": model.timeStartAfternoon,
            "time_end_afternoon": model.timeEndAfternoon
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'hours' + modelo;
    }

}