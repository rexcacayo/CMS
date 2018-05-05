import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../clases/client';
import { ClientsApiService } from '../../servicios/clientsApi.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styles: []
})

export class ClientViewComponent implements OnInit {

  id: number;
  apiUrl: string;
  client: Client = new Client(0,'','','','','',false);

  constructor(
    private http: Http,
    private servicioClients: ClientsApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    console.log(this.id);
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioClients.getClient(this.apiUrl, this.id).subscribe(data => {
        this.client = data;
      });
    });
  }
}
