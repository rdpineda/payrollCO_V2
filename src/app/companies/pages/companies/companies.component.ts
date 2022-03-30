import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService } from '../../services/companyService.index';
import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styles: [
  ]
})
export class CompaniesComponent implements OnInit {
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
  paises: any = {};
  depto: any = {};
  municip: any = {};
  caja: any = {};
  riesgo: any = {};
  paymentFrequency: any = {};
  paymentMethod: any = {};
  banks: any = {};
  accountType: any = {};




  constructor(
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _router: Router,
     public _activatedRoute: ActivatedRoute,
     public _modalUploadService: ModalUploadService,
     public _subirArchivoService: SubirArchivoService,
     private pageScrollServ: PageScrollService, 
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


  }

  ngOnInit(): void {

    this.items = [
      {label: 'Información Básica', icon: 'pi pi-fw pi-home'},
      {label: 'Información de Pago', icon: 'pi pi-fw pi-calendar'},
      {label: 'Información de Nómina', icon: 'pi pi-fw pi-pencil'},
      {label: 'Centros de Costos', icon: 'pi pi-fw pi-file'},
      {label: 'Areas', icon: 'pi pi-fw pi-cog'},
      {label: 'Sucursales', icon: 'pi pi-fw pi-cog'},
      {label: 'Cargos', icon: 'pi pi-fw pi-cog'},
      {label: 'Conceptos', icon: 'pi pi-fw pi-cog'}
  ];

  

  this.activeItem = this.items[0];

 

  }

  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      document: this.document
    });

    this.active = i;
  }

  cargarCompanyInfo( id: string ) {
    //this._companyInfoService.cargarCompanyInfo( id )
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
          console.log('componente',this.company)
          /* if (this.company.country_id) {this.obtenerPaises( this.company.country_id )};
          if (this.company.state_id) {this.obtenerDepartamento(this.company.state_id)};
          if (this.company.city_id) {this.obtenerMunicipios(this.company.city_id)};
          if (this.company.compensationFund_id) {this.obtenerCajasCompensacion(this.company.compensationFund_id)};
          if (this.company.entityRisks_id) {this.obtenerEntidadRiesgos(this.company.entityRisks_id)}; */
          
        });

  }

  actualizarImagen( company: Company){
  
    this._modalUploadService.mostrarModal('companys', company.id! );
    
    
  }

}
