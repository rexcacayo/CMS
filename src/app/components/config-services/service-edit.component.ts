import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from '../../clases/service';
import { Employee } from '../../clases/employee';
import { ServicesApiService } from '../../servicios/servicesApi.service';
import { EmployeesApiService } from '../../servicios/employeesApi.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styles: []
})

export class ServiceEditComponent implements OnInit {

  serviceForm: FormGroup;
  id: number;
  name: string;
  apiUrl: string;
  employees: Array<Employee> = [];
  service: Service = new Service(0,'',Array<Employee>(),false);

  constructor(
    public fb: FormBuilder, 
    private http: Http,
    private router: Router,
    private servicio: ServicesApiService,
    private servicioEmployees: EmployeesApiService,
    private route: ActivatedRoute
  ) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicio.getService(this.apiUrl, this.id).subscribe(data => {
        this.service = data;
        console.log(this.service);
        this.servicioEmployees.getEmployees(this.apiUrl).subscribe(data => {
          this.employees = data;
          console.log(this.employees);
          this.employees.forEach(employee => {
            if(this.service.employees.find(x => x.id === employee.id)){
              console.log('Employee Id: ' + employee.id);
              employee.isChecked = true;
            }
          });
        });
      });
    });
  }

  edit(){
    console.log("Service to edit:" + this.serviceForm.get('name').value);
    this.servicio.editService(this.apiUrl, this.service).subscribe(data => {
      console.log(data['data']);
      this.router.navigate(['configService']);
    });
  }

  asignarEmployee(item:Employee){
    console.log("Employees del Service: " + JSON.stringify(this.service.employees));
    if(this.service.employees.find(x => x.id === item.id)){
      console.log('Quitar employee: ' + JSON.stringify(item));
      this.service.employees.splice(this.service.employees.findIndex(x => x.id === item.id), 1);
    }else{
      console.log('Agregar employee');
      this.service.employees.push(item);
    }
    console.log("Employees del Service Después: " + JSON.stringify(this.service.employees));
  }

}
