import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Holiday } from '../../clases/holiday';
import { HolidaysApiService } from '../../servicios/holidaysApi.service';

@Component({
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  styles: []
})

export class HolidayEditComponent implements OnInit {

  holidayForm: FormGroup;
  id: number;
  name: string;
  apiUrl: string;
  holiday: Holiday = new Holiday(0,'','',0);

  constructor(
    public fb: FormBuilder, 
    private http: Http,
    private router: Router,
    private servicioHolidays: HolidaysApiService,
    private route: ActivatedRoute
  ) {

    this.holidayForm = this.fb.group({
      date: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHolidays.getHoliday(this.apiUrl, this.id).subscribe(data => {
        this.holiday = data;
      });
    });
  }

  edit(){
    console.log("Holiday to edit:" + this.holidayForm.get('date').value);
    this.servicioHolidays.editHoliday(this.apiUrl, this.holiday).subscribe(data => {
      console.log(data['data']);
      this.router.navigate(['configHolidays']);
    });
  }
}