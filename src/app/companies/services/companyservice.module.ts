import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService,  ConceptService, ProductService } from './companyService.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    CompanyService,
    ConceptService,
    ProductService
  ],
  declarations: [],
 
})
export class CompanyServiceModule { }