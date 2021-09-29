import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CompanyserviceModule } from './companies/services/companyservice.module';
import { EmployeeserviceModule } from './employees/services/employeeService.module';
import { PayrollModule } from './payroll/payroll.module';
import localeES from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
registerLocaleData(localeES, 'en');








@NgModule({
  declarations: [
 AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CompanyserviceModule,
    EmployeeserviceModule,
    PayrollModule,
    DashboardRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
