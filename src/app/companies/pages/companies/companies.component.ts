import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService, CountryService, StateService, CityService, SocialSecurityEntityService,
         PaymentFrequencyService, CompanyPaymentService, PaymentMethodService, BankService, AccounttypeService } from '../../services/companyService.index';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';
import { Country } from '../../models/country.model';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService, NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;

  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;
  public date: Date = new Date();
  forma!: FormGroup;
  public company: any = {};
  public companyInfo: any = {};
  public companyPayment: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  country: any = {};
  state: any = {};
  city: any = {};
  caja: any = {};
  riesgo: any = {};
  paymentFrequency: any = {};
  paymentMethod: any = {};
  banks: any = {};
  accountType: any = {};




  constructor(
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _companyPaymentService: CompanyPaymentService,
     public _countryService: CountryService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _socialSecurityEntityService: SocialSecurityEntityService,
     public _paymentFrequencyService: PaymentFrequencyService,
     public _paymentMethodService: PaymentMethodService,
     public _bankService: BankService,
     public _accounttypeService: AccounttypeService,
     public _router: Router,
     public _activatedRoute: ActivatedRoute,
     public _modalUploadService: ModalUploadService,
     public _subirArchivoService: SubirArchivoService,
     public pageScrollServ: PageScrollService, 
     
     @Inject(DOCUMENT) private document: any
     /* public _countryService: CountryService,
     public _usuarioService: UsuarioService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _socialSecurityEntityService: SocialSecurityEntityService,
     public _companyPaymentService: CompanyPaymentService,
     public _paymentFrequencyService: PaymentFrequencyService,
     public _paymentMethodService: PaymentMethodService,
     public _bankService: BankService,
     public _accounttypeService: AccounttypeService */
  ) { 

    this.company = this._usuarioService.empresas;
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
    

    if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
     
      
    } else {
      if(this.company.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
      }
    }

    this.cargarCompanyInfo( this.empresa.id );
    this.cargarCompanyPayment(this.empresa.id);


  }

  ngOnInit(): void {

    /* this.items = [
      {label: 'Información Básica', icon: 'pi pi-fw pi-home'},
      {label: 'Información de Pago', icon: 'pi pi-fw pi-calendar'},
      {label: 'Información de Nómina', icon: 'pi pi-fw pi-pencil'},
      {label: 'Centros de Costos', icon: 'pi pi-fw pi-file'},
      {label: 'Areas', icon: 'pi pi-fw pi-cog'},
      {label: 'Sucursales', icon: 'pi pi-fw pi-cog'},
      {label: 'Cargos', icon: 'pi pi-fw pi-cog'},
      {label: 'Conceptos', icon: 'pi pi-fw pi-cog'}
  ];


 
  

  this.activeItem = this.items[0]; */

 


  this.pageScrollServ.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });


  }


  

   onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 380,
      document: this.document
    });

    this.active = i;
  } 




  

  cargarCompanyInfo( id: string ) {
    //this._companyInfoService.cargarCompanyInfo( id )
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
          
           if (this.company.country_id) {this.obtenerCountry( this.company.country_id )};
          if (this.company.state_id) {this.obtenerState(this.company.state_id)};
          if (this.company.city_id) {this.obtenerCity(this.company.city_id)};
          if (this.company.compensationFund_id) {this.obtenerCajasCompensacion(this.company.compensationFund_id)};
          if (this.company.entityRisks_id) {this.obtenerEntidadRiesgos(this.company.entityRisks_id)}; 
          
        });

  }

  cargarCompanyPayment( id: string ) {
    this._companyPaymentService.cargarCompanyPayment( id )
        .subscribe( company => {
          this.companyPayment = company;
         
          if (this.companyPayment.paymentFrequency_id) {this.obtenerPaymentFrequency( this.companyPayment.paymentFrequency_id )};
           if (this.companyPayment.paymentMethod_id) {this.obtenerPaymentMetod( this.companyPayment.paymentMethod_id )};
          if (this.companyPayment.bank_id) {this.obtenerBank( this.companyPayment.bank_id )};
          if (this.companyPayment.accountType_id) {this.obtenerAccountType( this.companyPayment.accountType_id)};
          
        });

  }

  actualizarImagen( company: Company){
  
    this._modalUploadService.mostrarModal('companys', company.id! );
    
    
  }

  obtenerCountry( id: string)  {
    this._countryService.obtenerPaises( id )
        .subscribe( country => {
          this.country = country;
          
  });
}

obtenerState( id: string)  {
  this._stateService.obtenerDepartamento( id )
      .subscribe( state => {
        this.state = state;
});
}

obtenerCity( id: string)  {
  this._cityService.obtenerMunicipio( id )
      .subscribe( city => {
        this.city = city;
});
}

obtenerCajasCompensacion(id : string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntity => {
        this.caja = socialSecurityEntity;
});
} 

obtenerEntidadRiesgos(id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS(id)
      .subscribe( socialSecurityEntity => {
        console.log('c', socialSecurityEntity)
        this.riesgo = socialSecurityEntity;
        console.log('riesgo', this.riesgo)
});
}

obtenerPaymentFrequency( id: string ) {
  this._paymentFrequencyService.obtenerFrecuenciaPago( id )
  .subscribe( resp => this.paymentFrequency = resp);
}

obtenerPaymentMetod( id: string ) {
  this._paymentMethodService.obtenerMetodoPago( id )
  .subscribe( resp => this.paymentMethod = resp);
}

obtenerBank( id: string) {
  this._bankService.obtenerBanco( id )
  .subscribe( resp => this.banks = resp);
  
} 

obtenerAccountType( id: string ) {
  this._accounttypeService.obtenerTipoCuenta( id )
  .subscribe( resp => this.accountType = resp);

}

}
