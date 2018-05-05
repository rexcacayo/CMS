import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '../../clases/store';
import { StoresApiService } from '../../servicios/storeApi.service';

@Component({
  selector: 'app-configstore-info',
  templateUrl: './configstore-info.component.html',
  styles: []
})

export class ConfigstoreInfoComponent implements OnInit {

  storeInfoForm: FormGroup;
  apiUrl: string;
  store: Store = new Store(0,'','','','','','',0);

  constructor(
    public fb: FormBuilder, 
    private http: Http,
    private servicioStore: StoresApiService
  ) {
    this.storeInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      url: ['', [Validators.required, Validators.maxLength(200)]],
      telephone1: ['', [Validators.required, Validators.maxLength(20)]],
      telephone2: ['', [Validators.maxLength(80)]],
      locate: ['']
    });
  }

  ngOnInit() {
    this.http.get('assets/appConfig.json').subscribe(res => {
      this.apiUrl = res.json()[0]['apiUrl'];
      this.servicioStore.getStores(this.apiUrl).subscribe(data => {
        this.store = data;
      });
    });
  }

  save(){
    console.log("Store to edit:" + this.storeInfoForm.get('name').value);
    this.servicioStore.editStore(this.apiUrl, this.store).subscribe(data => {
      console.log(data);
    });
  }

}
