import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';




@NgModule({
  declarations: [
    CompaniesComponent,
  
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    NgxPageScrollCoreModule
   
    
  ]
})
export class CompaniesModule { }
