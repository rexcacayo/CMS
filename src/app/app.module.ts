import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


//rutas
import {APP_ROUTING} from './app.routes';


//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AssideComponent } from './components/shared/asside/asside.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { IoncardsComponent } from './components/shared/ioncards/ioncards.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigstoreInfoComponent } from './components/configstore-info/configstore-info.component';
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

// servicios
import { AppointmentsApiService } from './servicios/appointmentsApi.service';
import { ClientsApiService } from './servicios/clientsApi.service';
import { EmployeesApiService } from './servicios/employeesApi.service';
import { HoursApiService } from './servicios/hoursApi.service';
import { ServicesApiService } from './servicios/servicesApi.service';
import { StoresApiService } from './servicios/storeApi.service';
import { HolidaysApiService } from './servicios/holidaysApi.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AssideComponent,
    FooterComponent,
    BreadcrumbsComponent,
    IoncardsComponent,
    HomeComponent,
    ConfigstoreInfoComponent,
    ConfigServicesComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    ConfigEmpoyeesComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    ConfigHoursComponent,
    HourAddComponent,
    HourEditComponent,
    ClientsComponent,
    ClientViewComponent,
    ConfigHolidaysComponent,
    HolidayAddComponent,
    HolidayEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    AppointmentsApiService,
    ClientsApiService,
    EmployeesApiService,
    HoursApiService,
    ServicesApiService,
    StoresApiService,
    HolidaysApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
