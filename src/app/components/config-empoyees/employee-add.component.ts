import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServicesApiService } from '../../servicios/servicesApi.service';
import { EmployeesApiService } from '../../servicios/employeesApi.service';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styles: []
})

export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  employee: Employee = new Employee(0,'',Array<Service>(),false);
  services: Array<Service> = [];
  servicesAssigned: Array<Service> = [];
  apiUrl:string = '';

  constructor(
    public fb: FormBuilder, 
    private router: Router,
    private servicio: ServicesApiService,
    private servicioEmployee: EmployeesApiService, 
    private http:Http
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicio.getServices(this.apiUrl).subscribe(data => {
        this.services = data;
        console.log(this.services);
      });
    });
  }

  add(){
    console.log("Employee to insert:");
    this.employee.services = this.servicesAssigned;
    console.log(this.employee);
    this.servicioEmployee.addEmployee(this.apiUrl, this.employee).subscribe(data => {
      console.log("Employees: " + data['data']);
      this.router.navigate(['configEmployee']);
    });
  }

  asignarService(item:Service){
    if(this.servicesAssigned.includes(item)){
      this.servicesAssigned.splice(this.servicesAssigned.indexOf(item), 1);
    }else{
      this.servicesAssigned.push(item);
    }
  }

}