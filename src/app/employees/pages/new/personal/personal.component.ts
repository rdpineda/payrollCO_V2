import {Component,OnInit} from '@angular/core';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { IdentificationType } from '../../../models/identificationType.model';
import { Gender } from '../../../models/gender.model';
import { EmployeeService, IdentificationTypeService, GenderService, CountryService, StateService, 
    CityService } from '../../../services/employeeService.index';
import { AuthService } from '../../../../auth/services/authservice.index';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class PersonalComponent implements OnInit {
    date!: Date;
    personalInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    identificationTypes: IdentificationType [] = [];
    genders: Gender[] = [];

    minDate!: Date;

    maxDate!: Date;

    invalidDates!: Array<Date>
    es: any;
    constructor(public _employeeNewService : EmployeeNewService, 
                private router: Router,
                public _identificationTypeService: IdentificationTypeService,
                public _genderService: GenderService,
                ) { }

    ngOnInit() { 

        this.getAllIdentificationType();
        this. getAllGender();

        this.personalInformation = this._employeeNewService.getEmployeeInformation().personalInformation;
       
     

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }


        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    }

    nextPage() {
        if (this.personalInformation.firstname) {
            this._employeeNewService.employeeInformation.personalInformation = this.personalInformation;
            this.router.navigate(['steps/seat']);

            return;
        }

        this.submitted = true;
    }


    getAllIdentificationType()  {
        this._identificationTypeService.cargarTiposDocumentos()
            .subscribe( identificationType => {
              this.identificationTypes = identificationType;    
      });
      }

      getAllGender()  {
        this._genderService.cargarGeneros()
            .subscribe( genders => {
              this.genders = genders;    
      });
      }



}