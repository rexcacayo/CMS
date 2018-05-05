import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HoursApiService } from '../../servicios/hoursApi.service';
import { Hour } from '../../clases/hour';

@Component({
  selector: 'app-hour-add',
  templateUrl: './hour-add.component.html',
  styles: []
})

export class HourAddComponent implements OnInit {

  hourForm: FormGroup;
  hour: Hour = new Hour(0,'','','','','');
  apiUrl:string = '';

  constructor(
    public fb: FormBuilder, 
    private router: Router,
    private servicioHours: HoursApiService, 
    private http:Http
  ) {
    this.hourForm = this.fb.group({
      day: ['', [Validators.required]],
      timeStartMorning: ['', [Validators.required]],
      timeEndMorning: ['', [Validators.required]],
      timeStartAfternoon: ['', [Validators.required]],
      timeEndAfternoon: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  add(){
    console.log("Hour to insert:");
    console.log(this.hourForm.get('day').value);
    
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHours.addHour(this.apiUrl, this.hour).subscribe(data => {
        console.log(data['data']);
        this.router.navigate(['configHours']);
      });
    });
  }

}
