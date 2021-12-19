import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConceptService } from 'src/app/companies/services/companyservice.index';
import { EmployeeService } from 'src/app/employees/services/employee.service';
import { GetEmployeeService } from '../../services/get-employee.service';
import { PayrollService } from '../../services/payroll.service';
import { PeriodService } from '../../services/period.service';
import { AbsenteeService } from '../../services/absentee.service';
import { Period} from '../../models/period.model'

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

  employeeAbsentee: any = [];
  absenteeDialog!: boolean;
  absentee: any = [];
  absenteeType: any = {};
  submitted!: boolean;
  statuses!: any[];
  types: any = [];
  typeSelect!: string;

  formaAbsenteeHistory: FormGroup = this.fb.group({
    
  });



  constructor(private fb: FormBuilder,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private _absenteeService: AbsenteeService) { 


                this.getAbsenteeType();
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
        });
}



  saveAbsenteeHistory(){

  }

  openAbsentee(){
    this.absentee = {};
    this.submitted = false;
    this.absenteeDialog = true;
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
