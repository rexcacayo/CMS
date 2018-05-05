import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Holiday } from '../../clases/holiday';
import { HolidaysApiService } from '../../servicios/holidaysApi.service';

@Component({
  selector: 'app-config-holidays',
  templateUrl: './configstore-holidays.component.html',
  styles: []
})

export class ConfigHolidaysComponent implements OnInit {

  holidays: Array<Holiday> = [];
  holiday: Holiday = new Holiday(0,'','',0);
  apiUrl:string = '';

  constructor(
    private servicioHolidays: HolidaysApiService, 
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHolidays.getHolidays(this.apiUrl).subscribe(data => {
        this.holidays = data;
        console.log(this.holidays);
      });
    });
  }

  edit(holiday:Holiday){
    console.log("Holiday: " + holiday);    
    this.router.navigate(['configHolidays/holidayEdit', holiday.id]);
  }

}