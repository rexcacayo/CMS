import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Store } from '../clases/store';

@Injectable()
export class StoresApiService{
    
    constructor(private http: Http){}

    getStores(apiUrl:string): Observable<Store>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    addStore(apiUrl:string, model: Store): Observable<Store[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editStore(apiUrl:string, model: Store): Observable<Store[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteStore(apiUrl:string, model: Store): Observable<Store>{
        return this.http.delete(this.getUrl(apiUrl, '/' + model.id)).catch(this.error);
    }

    editAppointmentsDuration(apiUrl:string, id: number, duration: number): Observable<string>{
        return this.http.post(this.getUrl(apiUrl, '/editAppointmentsDuration'),{'id':id, 'duration':duration}).map(this.getDatosGenerales).catch(this.error);
    }

    private error(error: any){
        console.log(error);
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
        return Observable.throw(msg);
    }

    private getDatosGenerales(data: Response){
        let datos = data.json();
        return datos || [];
    }

    private getDatos(data: Response){
        let datos = data.json()['data'];
        console.log(datos);
        let store: Store = new Store(0,'','','','','','',0);
        store.id = datos[0].id;
        store.name = datos[0].name;
        store.email = datos[0].email;
        store.url = datos[0].url;
        store.telephone1 = datos[0].telephone1;
        store.telephone2 = datos[0].telephone2;
        store.locate = datos[0].locate;
        store.appointmentsDuration = datos[0].appointments_duration;
        return store || null;
    }

    private setDato(model: Store){
        let datos: any = 
        {
            "name": model.name,
            "email": model.email,
            "url": model.url,
            "telephone1": model.telephone1,
            "telephone2": model.telephone2,
            "locate": model.locate,
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'stores' + modelo;
    }

}