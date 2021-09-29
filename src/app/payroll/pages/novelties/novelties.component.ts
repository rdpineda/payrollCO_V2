import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../../companies/services/companyservice.index';
import { Company } from '../../../companies/models/company.model';
/* import {MessageService, SelectItem } from 'primeng/api'; */
import { EmployeeService } from '../../../employees/services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../../employees/models/employee.model';
import { Movements } from '../../models/movements.model';
import { Period} from '../../models/period.model'
import { PeriodService } from '../../services/payrollService.index';
import { PayrollService } from '../../services/payrollService.index';
import { CreateNoveltiesComponent } from '../../components/create-novelties/create-novelties.component';

import {MenuItem} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GetEmployeeService } from '../../services/get-employee.service';


@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrls: ['./novelties.component.scss'],
  providers: [DialogService]
})
export class NoveltiesComponent implements OnInit {


  @Input() employeeS: any ={};
  @Input() index!: string;

  @Output() employeeSelect!: EventEmitter<string>


  ref!: DynamicDialogRef;
  
  items!: MenuItem[];
  movements: any = {};
  employee: any = {};
  employees: any = {};
  employeesCompany: any = {};
  employeeMovements: any = [];
  employeeMovementsPayroll: any = [];
  period: any = {};
  empleado!: string;
  
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  concept: any = {};

  
  forma: FormGroup = this.fb.group({
   
  });


  constructor( public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _movementService: PayrollService,
              public dialogService: DialogService,
              public _getEmployeeService: GetEmployeeService, 
              private fb: FormBuilder,
            
              
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

                          
                          this.createdPayroll(this.empresa.id)
                          this.getEmployeeByCompany(this.empresa.id)
                          this.getPeriodByProcess(this.empresa.id)

                          this.employeeSelect = new EventEmitter();
                      

               }



  ngOnInit(){

    this.items = [{
      label: 'Options',
      items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
         
      },
      {
          label: 'Delete',
          icon: 'pi pi-times',
         
      }
      ]},
      
  ];

   }


   getPeriodByProcess( id: string ) {
    
    this._periodService.getPeriodByCompanyByProcess( id)
        .subscribe( (period: any={}) => {
          this.period[0] = period[0];
          console.log(period,this.period.number,this.period[0].number,'periodo')
          if (this.period) {
           
            this.getMovementByPeriod( this.period[0].id );
            this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id ); 
          }
        });

  }
  

  getMovementByPeriod( id: string ) {
    
    this._movementService.getMovementsByPeriod(id)
        .subscribe( (movement:Movements) => {
          this.movements = movement
          console.log(movement,'MovementByperiod')
          if (this.movements) {
           
            
            this.getMovementByConcept( this.movements[40].concept_id, this.movements[40].period_id)
            
          }
        });

  }

  getMovementByEmployee(id: string, period: string ) {
    this._movementService.getMovementsByEmployee( id, period )
        .subscribe( employeeMovements => {
          this.employeeMovements = employeeMovements
          console.log(employeeMovements,'movimientoempleados')
          if (this.employeeMovements) {
           
            this.getEmployeeById( this.employeeMovements[0].employee_id );
            
            
          }

        });
  }

  getMovementPayrollByEmployee(id: string, period: string ) {
    this._movementService.getMovementsPayrollByEmployee( id, period )
        .subscribe( employeeMovementsPayroll => {
          this.employeeMovementsPayroll = employeeMovementsPayroll
          console.log(employeeMovementsPayroll,'movimientoempleados555')
          if (this.employeeMovementsPayroll) {
           
            this.getEmployeeById( this.employeeMovementsPayroll[0].employee_id );
            
            
          }

        });
  }

  getMovementByConcept(id: string , period: string) {
    this._movementService.getMovementsByConcept( id, period )
        .subscribe( conceptMovements => {
          this.concept = conceptMovements
        });
  }
  
  createdPayroll(id: string) {
    this._movementService.createPayroll(id)
        .subscribe((payrollCreated: any) => {
          console.log(payrollCreated,'creado')
        })
  }




  getEmployeeById( id: string) {
    this._employeeService.cargarEmployees( id )
        .subscribe((employee:Employee) => {
          console.log(employee)
          this.employee  = employee
          console.log(this.employee,'solo')
        })
  }

  getEmployeeByCompany( id: string) {
    this._employeeService.cargarEmployeeCompany( id )
        .subscribe((employeesCompany:Employee) => {
          console.log(employeesCompany)
          this.employeesCompany  = employeesCompany
          console.log(this.employeesCompany)
        })
  }
  
  buscarEmployees( termino: string){

  }

    show(employeeCard: string, group: string) {
    this.ref = this.dialogService.open(CreateNoveltiesComponent,{
        header: 'Ingreso de Novedades' +' ' + group,
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
        
    });
    
    this._getEmployeeService.enviar(employeeCard);
    this._getEmployeeService.enviarGroup(group);

    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );
  });
  } 
  
  veremployee(idx: number){
   console.log('empleado', idx) 
  }
 
/*   buscarEmployees( termino: string){

    if ( termino.length <= 0 ){
      console.log(termino,'hola')
      this.getEmployees( this.empresa.id);
      return;
    }

    this._employeeService.buscarEmployees( termino )
        .subscribe( resp => {
          this.employees = resp 
          console.log(this.employees)
        });
} */


}
