import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeCardListComponent } from './components/employee-card-list/employee-card-list.component';


@NgModule({
  declarations: [
   ListComponent,
   EmployeeComponent,
   EmployeeCardListComponent
  
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    Ng2PageScrollModule
    
  ]
})
export class EmployeesModule { }
