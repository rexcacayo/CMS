import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';
import { Client } from '../clases/client';

@Injectable()
export class ClientsApiService{
    
    constructor(private http: Http){}

    getClients(apiUrl:string): Observable<Client[]>{
        return this.http.get(this.getUrl(apiUrl, '')).map(this.getDatos).catch(this.error);
    }

    getClient(apiUrl:string, id:number): Observable<Client>{
        return this.http.get(this.getUrl(apiUrl, '/' + id)).map(this.getDato).catch(this.error);
    }

    addClient(apiUrl:string, model: Client): Observable<Client[]>{
        return this.http.post(this.getUrl(apiUrl, ''),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    editClient(apiUrl:string, model: Client): Observable<Client[]>{
        return this.http.put(this.getUrl(apiUrl, '/' + model.id),this.setDato(model)).map(this.getDatos).catch(this.error);
    }

    deleteClient(apiUrl:string, model: Client): Observable<Client>{
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
        let clients: Array<Client> = [];
        for(var i = 0;i<datos.length;i++) { 
          let client: Client = new Client(0,'','','','','',false);
          client.id = datos[i].id;
          client.name = datos[i].name;
          client.age = datos[i].age;
          client.birthday = datos[i].birthday;
          client.email = datos[i].email;
          client.gender = datos[i].gender;
          if(client.gender == 'male'){
              client.isMale = true;
          }
          clients.push(client);
        } 
        return clients || [];
    }

    private getDato(data: Response){
        let datos = data.json()['data'];
        let client: Client = new Client(0,'','','','','',false);
        client.id = datos.id;
        client.name = datos.name;
        client.age = datos.age;
        client.birthday = datos.birthday;
        client.email = datos.email;
        client.gender = datos.gender;
        if(client.gender == 'male'){
            client.isMale = true;
        }
        return client;
    }

    private setDato(model: Client){
        let datos: any = 
        {
            "name": model.name,
            "age": model.age,
            "birthday": model.birthday,
            "email": model.email,
            "gender": model.gender
        };
        console.log("SetDatos: " + datos);
        return datos;
    }

    private getUrl(apiUrl:string, modelo: String){
        console.log('getUrl: ' + apiUrl);
        return apiUrl + 'clients' + modelo;
    }

}