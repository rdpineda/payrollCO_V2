import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService,  ConceptService, ProductService, CountryService, StateService, CityService,
         SocialSecurityEntityService, PaymentFrequencyService, CompanyPaymentService, PaymentMethodService, BankService,
         AccounttypeService } from './companyService.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    CompanyService,
    ConceptService,
    CountryService,
    StateService,
    CityService,
    SocialSecurityEntityService,
    PaymentFrequencyService,
    CompanyPaymentService,
    PaymentMethodService,
    BankService,
    AccounttypeService,
    ProductService
  ],
  declarations: [],
 
})
export class CompanyServiceModule { }