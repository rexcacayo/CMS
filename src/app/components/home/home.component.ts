import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Appointment } from '../../clases/appointment';
import { AppointmentsApiService } from '../../servicios/appointmentsApi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
})
export class HomeComponent implements OnInit {

  appointments: Array<Appointment> = [];
  apiUrl:string = '';

  constructor(
    private servicioAppointments: AppointmentsApiService, 
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioAppointments.getAppointments(this.apiUrl).subscribe(data => {
        this.appointments = data;
        console.log(this.appointments);
      });
    });
  }

}
