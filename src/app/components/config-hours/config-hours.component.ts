import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from '../../clases/service';
import { Hour } from '../../clases/hour';
import { Store } from '../../clases/store';
import { HoursApiService } from '../../servicios/hoursApi.service';
import { StoresApiService } from '../../servicios/storeApi.service';

@Component({
  selector: 'app-config-hours',
  templateUrl: './config-hours.component.html',
  styles: []
})

export class ConfigHoursComponent implements OnInit {

  appointmentsDurationForm: FormGroup;
  hours: Array<Hour> = [];
  hour: Hour = new Hour(0,'','','','','');
  store: Store = new Store(0,'','','','','','',0);
  apiUrl:string = '';

  constructor(
    private servicioHours: HoursApiService, 
    public fb: FormBuilder, 
    private router: Router,
    private servicioStore: StoresApiService,
    private http:Http
  ) {
    this.appointmentsDurationForm = this.fb.group({
      duration: ['']
    });
  }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHours.getHours(this.apiUrl).subscribe(data => {
        this.hours = data;
        console.log(this.hours);
      });
      this.servicioStore.getStores(this.apiUrl).subscribe(data => {
        this.store = data;
      });
    });
    console.log(this.store);
    
  }

  saveAppointmentsDuration(){
    console.log("Duration:" + this.store.appointmentsDuration);
    this.servicioStore.editAppointmentsDuration(this.apiUrl, this.store.id, this.store.appointmentsDuration).subscribe(data => {
      console.log(data);
    });
  }

  edit(hour:Hour){
    console.log("Hour: " + hour);    
    this.router.navigate(['configHours/hourEdit', hour.id]);
  }

}
