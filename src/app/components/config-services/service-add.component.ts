import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServicesApiService } from '../../servicios/servicesApi.service';
import { EmployeesApiService } from '../../servicios/employeesApi.service';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styles: []
})

export class ServiceAddComponent implements OnInit {

  serviceForm: FormGroup;
  service: Service = new Service(0,'',Array<Employee>(),false);
  employees: Array<Employee> = [];
  employeesAssigned: Array<Employee> = [];
  apiUrl:string = '';

  constructor(
    public fb: FormBuilder, 
    private router: Router,
    private servicio: ServicesApiService,
    private servicioEmployees: EmployeesApiService,
    private http:Http
  ) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioEmployees.getEmployees(this.apiUrl).subscribe(data => {
        this.employees = data;
        console.log(this.employees);
      });
    });
  }

  add(){
    console.log("Service to insert:");
    this.service.employees = this.employeesAssigned;
    console.log(this.service);
    this.servicio.addService(this.apiUrl, this.service).subscribe(data => {
      console.log("Servicios: " + data['data']);
      this.router.navigate(['configService']);
    });
  }

  asignarEmployee(item:Employee){
    if(this.employeesAssigned.includes(item)){
      this.employeesAssigned.splice(this.employeesAssigned.indexOf(item), 1);
    }else{
      this.employeesAssigned.push(item);
    }
  }
}
