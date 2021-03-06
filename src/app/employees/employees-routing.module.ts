import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ListComponent } from './pages/list/list.component';

import { LoginComponent } from '../auth/pages/login/login.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: ':id',
        component: EmployeeComponent
      },
      {
        path: '**',
        component: LoginComponent
      },
      {
        path: ':id/#p9',
        component: EmployeeComponent
      }
    ]
  }
]



@NgModule({
  
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeesRoutingModule { }