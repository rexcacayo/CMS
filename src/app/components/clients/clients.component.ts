import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Client } from '../../clases/client';
import { ClientsApiService } from '../../servicios/clientsApi.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {

  clients: Array<Client> = [];
  client: Client = new Client(0,'','','','','',false);
  apiUrl:string = '';

  constructor(
    private servicioClientes: ClientsApiService, 
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioClientes.getClients(this.apiUrl).subscribe(data => {
        this.clients = data;
        console.log(this.clients);
      });
    });
  }

  view(client:Client){
    console.log("Client: " + client);    
    this.router.navigate(['clients/clientView', client.id]);
  }

}
