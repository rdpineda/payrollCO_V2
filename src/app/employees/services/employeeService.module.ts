import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeContractService, EmployeeService }    from './employeeService.index';
import { SubirArchivoService } from './employeeService.index';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    EmployeeService,
    SubirArchivoService,
    EmployeeContractService
  ],
  declarations: [],
 
})
export class EmployeeserviceModule { }