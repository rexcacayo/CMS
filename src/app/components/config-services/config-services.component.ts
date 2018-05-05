import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';
import { ServicesApiService } from '../../servicios/servicesApi.service';

@Component({
  selector: 'app-config-services',
  templateUrl: './config-services.component.html',
  styles: []
})

export class ConfigServicesComponent implements OnInit {

  services: Array<Service> = [];
  service: Service = new Service(0,'',Array<Employee>(),false);
  apiUrl:string = '';

  constructor(
    private servicio: ServicesApiService, 
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicio.getServices(this.apiUrl).subscribe(data => {
        this.services = data;
        console.log(this.services);
      });
    });
  }

  edit(service:Service){
    console.log("Service: " + service);    
    this.router.navigate(['configService/serviceEdit', service.id]);
  }

}
