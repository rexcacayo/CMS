import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';
import { EmployeesApiService } from '../../servicios/employeesApi.service';
import { ServicesApiService } from '../../servicios/servicesApi.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styles: []
})

export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  id: number;
  name: string;
  apiUrl: string;
  employee: Employee = new Employee(0,'',Array<Service>(),false);
  services: Array<Service> = [];

  constructor(
    public fb: FormBuilder, 
    private http: Http,
    private router: Router,
    private servicioEmployees: EmployeesApiService,
    private servicio: ServicesApiService,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioEmployees.getEmployee(this.apiUrl, this.id).subscribe(data => {
        this.employee = data;
        console.log(this.employee);
        this.servicio.getServices(this.apiUrl).subscribe(data => {
          this.services = data;
          console.log(this.services);
          this.services.forEach(service => {
            if(this.employee.services.find(x => x.id === service.id)){
              console.log('Service Id: ' + service.id);
              service.isChecked = true;
            }
          });
        });
      });
    });
  }

  edit(){
    console.log("Employee to edit:" + this.employeeForm.get('name').value);
    this.servicioEmployees.editEmployee(this.apiUrl, this.employee).subscribe(data => {
      console.log(data['data']);
      this.router.navigate(['configEmployee']);
    });
  }

  asignarService(item:Service){
    console.log("Services del Employee: " + JSON.stringify(this.employee.services));
    if(this.employee.services.find(x => x.id === item.id)){
      console.log('Quitar service: ' + JSON.stringify(item));
      this.employee.services.splice(this.employee.services.findIndex(x => x.id === item.id), 1);
    }else{
      console.log('Agregar service');
      this.employee.services.push(item);
    }
    console.log("Services del Employee Después: " + JSON.stringify(this.employee.services));
  }

}
