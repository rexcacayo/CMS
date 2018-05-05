import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HolidaysApiService } from '../../servicios/holidaysApi.service';
import { Holiday } from '../../clases/holiday';

@Component({
  selector: 'app-holiday-add',
  templateUrl: './holiday-add.component.html',
  styles: []
})

export class HolidayAddComponent implements OnInit {

  holidayForm: FormGroup;
  holiday: Holiday = new Holiday(0,'','',0);
  apiUrl:string = '';

  constructor(
    public fb: FormBuilder, 
    private router: Router,
    private servicioHolidays: HolidaysApiService, 
    private http:Http
  ) {
    this.holidayForm = this.fb.group({
      date: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  add(){
    console.log("Holiday to insert:");
    console.log(this.holidayForm.get('date').value);
    
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHolidays.addHoliday(this.apiUrl, this.holiday).subscribe(data => {
        console.log(data['data']);
        this.router.navigate(['configHolidays']);
      });
    });
  }

}
