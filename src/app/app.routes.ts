import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConfigstoreInfoComponent } from './components/configstore-info/configstore-info.component'
import { ConfigServicesComponent } from './components/config-services/config-services.component';
import { ServiceAddComponent } from './components/config-services/service-add.component';
import { ServiceEditComponent } from './components/config-services/service-edit.component';
import { ConfigEmpoyeesComponent } from './components/config-empoyees/config-empoyees.component';
import { EmployeeAddComponent } from './components/config-empoyees/employee-add.component';
import { EmployeeEditComponent } from './components/config-empoyees/employee-edit.component';
import { ConfigHoursComponent } from './components/config-hours/config-hours.component';
import { HourAddComponent } from './components/config-hours/hour-add.component';
import { HourEditComponent } from './components/config-hours/hour-edit.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientViewComponent } from './components/clients/client-view.component';
import { ConfigHolidaysComponent } from './components/configstore-holidays/configstore-holidays.component';
import { HolidayAddComponent } from './components/configstore-holidays/holiday-add.component';
import { HolidayEditComponent } from './components/configstore-holidays/holiday-edit.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'configInfo' , component:  ConfigstoreInfoComponent },
  { path: 'configService' , component:  ConfigServicesComponent },
  { path: 'configService/serviceAdd' , component:  ServiceAddComponent },
  { path: 'configService/serviceEdit/:id' , component:  ServiceEditComponent },
  { path: 'configEmployee' , component:  ConfigEmpoyeesComponent },
  { path: 'configEmployee/employeeAdd' , component:  EmployeeAddComponent },
  { path: 'configEmployee/employeeEdit/:id' , component:  EmployeeEditComponent },
  { path: 'configHours' , component:  ConfigHoursComponent }, 
  { path: 'configHours/hourAdd' , component:  HourAddComponent }, 
  { path: 'configHours/hourEdit/:id' , component:  HourEditComponent }, 
  { path: 'configHolidays' , component:  ConfigHolidaysComponent }, 
  { path: 'configHolidays/holidayAdd' , component:  HolidayAddComponent }, 
  { path: 'configHolidays/holidayEdit/:id' , component:  HolidayEditComponent }, 
  { path: 'clients' , component:  ClientsComponent }, 
  { path: 'clients/clientView/:id' , component:  ClientViewComponent }, 
  { path: '*', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
