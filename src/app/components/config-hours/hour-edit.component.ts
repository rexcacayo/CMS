import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Hour } from '../../clases/hour';
import { HoursApiService } from '../../servicios/hoursApi.service';

@Component({
  selector: 'app-hour-edit',
  templateUrl: './hour-edit.component.html',
  styles: []
})

export class HourEditComponent implements OnInit {

  hourForm: FormGroup;
  id: number;
  name: string;
  apiUrl: string;
  hour: Hour = new Hour(0,'','','','','');

  constructor(
    public fb: FormBuilder, 
    private http: Http,
    private router: Router,
    private servicioHours: HoursApiService,
    private route: ActivatedRoute
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
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    console.log(this.id + " - " + this.name);
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioHours.getHour(this.apiUrl, this.id).subscribe(data => {
        this.hour = data;
      });
    });
  }

  edit(){
    console.log("Hour to edit:" + this.hourForm.get('day').value);
    this.servicioHours.editHour(this.apiUrl, this.hour).subscribe(data => {
      console.log(data['data']);
      this.router.navigate(['configHours']);
    });
  }
}
