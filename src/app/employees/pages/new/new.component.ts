import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompanyService } from '../../../companies/services/companyService.index';
import { Company } from '../../../companies/models/company.model';

import {SelectItem } from 'primeng/api';
import { Product } from 'src/app/companies/interfaces/producinterface';
import { ProductService } from 'src/app/companies/services/producto/productservice';
import { EmployeeService } from '../../services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../models/employee.model';
import { EmployeeContract } from '../../models/employeeContract.model';
import { EmployeeContractService, EmployeeNewService } from '../../services/employeeService.index';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [MessageService],
  
encapsulation: ViewEncapsulation.None
})
export class NewComponent implements OnInit {

 

  employees: Employee[] = [];
  employeeContract: EmployeeContract []= [];
  
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  desde = 0;
  totalRegistros = 0;
  items!: MenuItem[];
    
  subscription!: Subscription;

  constructor( public _employeeService:EmployeeService,
              public _employeeContract: EmployeeContractService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public messageService: MessageService,
               public _employeeNewService: EmployeeNewService
                ) { 


                this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
                this.usuario = JSON.parse(localStorage.getItem('usuario')!);
          
                if ( this.empresaseleccionada ){
                            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                          } else {
                            if(this.company.length > 1 ) {
                              this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                            } else {
                              this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                            }
                          }

                          
                        

               }


               
  ngOnInit(){ 


    this.items = [{
        label: 'Inf. Personal',
        routerLink: '/employees/new/personal'
    },
    {
        label: 'Info. Laboral',
        routerLink: 'seat'
    },
    {
        label: 'Contrato',
        routerLink: 'payment'
    },
    {
        label: 'Inf. Salarial',
        routerLink: 'confirmation'
    },
    {
        label: 'Inf. del Puesto',
        routerLink: 'confirmation'
    },
    {
        label: 'Forma de Pago',
        routerLink: 'confirmation'
    },
    {
        label: 'Seg. Social',
        routerLink: 'confirmation'
    },
    {
        label: 'Recurrentes',
        routerLink: 'confirmation'
    },
    {
        label: 'Confirmation',
        routerLink: 'confirmation'
    }

];

this.subscription = this._employeeNewService.recurrentPaymentComplete$.subscribe((personalInformation) =>{
    this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
});
 
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}

  

  


  
}
