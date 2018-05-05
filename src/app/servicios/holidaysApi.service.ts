import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Holiday } from '../clases/holiday';

@Injectable()
export class HolidaysApiService{
    
    constructor(private http: Http){}

    getHolidays(apiUrl:string): Observable<Holiday[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    getHoliday(apiUrl:string, id:number): Observable<Holiday>{
        return this.http.get(this.getUrl(apiUrl, '/' + id)).map(this.getDato).catch(this.error);
    }

    addHoliday(apiUrl:string, model: Holiday): Observable<Holiday[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editHoliday(apiUrl:string, model: Holiday): Observable<Holiday[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteHoliday(apiUrl:string, model: Holiday): Observable<Holiday>{
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
        let holidays: Array<Holiday> = [];
        for(var i = 0;i<datos.length;i++) { 
          let holiday: Holiday = new Holiday(0,'','',0);
          holiday.id = datos[i].id;
          holiday.date = datos[i].date;
          holiday.description = datos[i].description;
          holiday.storeId = datos[i].store_id;
          holidays.push(holiday);
        } 
        return holidays || [];
    }

    private getDato(data: Response){
        let datos = data.json()['data'];
        console.log('Datos: ');
        console.log(datos);
        let holiday: Holiday = new Holiday(0,'','',0);
        holiday.id = datos.id;
        holiday.date = datos.date;
        holiday.description = datos.description;
        holiday.storeId = datos.store_id;
        return holiday;
    }

    private setDato(model: Holiday){
        let datos: any = 
        {
            "date": model.date,
            "description": model.description,
            "store_id": 1
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'holidays' + modelo;
    }

}