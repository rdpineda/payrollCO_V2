import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConceptService } from 'src/app/companies/services/companyService.index';
import { EmployeeService } from 'src/app/employees/services/employee/employee.service';
import { GetEmployeeService } from '../../services/get-employee.service';
import { PayrollService } from '../../services/payroll.service';
import { PeriodService } from '../../services/period.service';
import { AbsenteeService } from '../../services/absentee.service';
import { DiagnosisService } from '../../services/diagnosis.service';
import { Period} from '../../models/period.model'
import * as moment from 'moment';

//import 'moment/locale/es';





interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-save-absentee-history',
  templateUrl: './save-absentee-history.component.html',
  styleUrls: ['./save-absentee-history.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog {
             width: 50vw;
            margin: 0 auto 20rem auto;
             display: block; 
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class SaveAbsenteeHistoryComponent implements OnInit {

  

  
  absenteeDialog!: boolean;
  absentee: any = {};
  absenteeEmployee: any = {};
  absenteeType: any = {};
  absenteeTypeId: any = [0];
  diagnosis: any = {};
  submitted!: boolean;
  statuses!: any[];
  types: any = [];
  typeSelect!: string;
  myDate = moment();
  period: any = {};
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  employeeSelect: any;

  formaAbsenteeHistory: FormGroup = this.fb.group({
    
  });



  constructor(private fb: FormBuilder,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private _absenteeService: AbsenteeService,
              private _diagnosisService: DiagnosisService,
              private _periodService: PeriodService,
              public _usuarioService: AuthService,
              public _getEmployeeService: GetEmployeeService, 
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

                this.getAbsenteeType();
                this.getDiagnosis();
                this.getPeriodByProcess(this.empresa.id)

                
                

                
  }

  


  ngOnInit(): void {

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
  ];
  }


getAbsenteeType(){
  this._absenteeService.getAbsenteeType()
        .subscribe( (absenteeType: any) => {
          this.absenteeType = absenteeType;
          
          console.log('componente', this.absenteeType )
        });
}

getAbsenteeTypeById(id:string){
  this._absenteeService.getAbsenteeTypeById(id)
        .subscribe( (absenteeType: any) => {
          this.absenteeTypeId = absenteeType;
          console.log('componente2', this.absenteeTypeId )
        });
}


getDiagnosis(){
  this._diagnosisService.getDiagnosis()
        .subscribe( (diagnosis: any) => {
          this.diagnosis = diagnosis;
        });
}

getAbsenteeByEmployeeByPeriod(employee_id: string, ini_period: Date, end_period: Date){
  this._absenteeService.getAbsenteeByEmployeeByPeriod(employee_id, ini_period, end_period)
        .subscribe( (absentees: any) => {
          this.absenteeEmployee = absentees;
          if (this.absenteeEmployee) {
            this.getAbsenteeTypeById(this.absenteeEmployee[0].absenteeType_id)
          }
          console.log('ausentismos', this.absenteeEmployee)
          
        });
}


getPeriodByProcess( id: string ) {
    
  this._periodService.getPeriodByCompanyByProcess( id)
      .subscribe( (period: any) => {
        this.period[0] = period[0];
        console.log(period,this.period.number,this.period[0].number,'periodo33')
         if (this.period) {


         this._getEmployeeService.recibir.subscribe(dato =>{
            this.employeeSelect = dato
            this.getAbsenteeByEmployeeByPeriod(this.employeeSelect,this.period[0].initialDate, this.period[0].endDate)
         })
          
          /* this.getMovementByPeriod( this.period[0].id );
          this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );  */
        } 
      });

} 


  saveAbsenteeHistory(){

  }

  openAbsentee(){
    this.absentee = {};
    this.submitted = false;
    this.absenteeDialog = true;


    
    //this._getEmployeeService.enviar(employeeCard);
  }

  hideAbsentee() {
    this.absenteeDialog = false;
    this.submitted = false;
}

  deleteSelectedProducts(){

  }

  editProduct(absentee: string){

  }

  deleteProduct(absentee: string){

  }

  

}
