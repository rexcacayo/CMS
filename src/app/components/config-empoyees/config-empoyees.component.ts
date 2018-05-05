import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';
import { EmployeesApiService } from '../../servicios/employeesApi.service';

@Component({
  selector: 'app-config-empoyees',
  templateUrl: './config-empoyees.component.html',
  styles: []
})

export class ConfigEmpoyeesComponent implements OnInit {

  employees: Array<Employee> = [];
  apiUrl:string = '';

  constructor(
    private servicioEmployees: EmployeesApiService, 
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioEmployees.getEmployees(this.apiUrl).subscribe(data => {
        this.employees = data;
        console.log(this.employees);
      });
    });
  }

  edit(employee:Employee){
    console.log("Employee: " + employee);    
    this.router.navigate(['configEmployee/employeeEdit', employee.id]);
  }

}
