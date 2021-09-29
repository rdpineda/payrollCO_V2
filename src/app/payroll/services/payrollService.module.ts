import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService, PeriodService, GetEmployeeService } from '../services/payrollService.index';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    PeriodService,
    PayrollService,
    GetEmployeeService, 
  ],
  declarations: [],
 
})
export class PayrollserviceModule { }