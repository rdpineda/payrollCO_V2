

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable()
export class EmployeeNewService {

    
    employeeInformation = {
        personalInformation: {
            tipodoc: null,
            documento: '',
            pnombre: '',
            snombre: '',
            papellido: '',
            sapellido: '',
            genero: null,
            fnacimiento: '',
            paisr: null,
            deptor: null,
            ciudadr: null,
            direccion: '',
            telefono: '',
            celular: '',
            email: ''
            
            
        },
        workingInformation: {
            class: null,
            wagon: null,
            seat: null
        },
        contractInformation: {
            class: null,
            wagon: null,
            seat: null
        },

        salaryInformation: {
            class: null,
            wagon: null,
            seat: null
        },
        jobInformation: {
            class: null,
            wagon: null,
            seat: null
        },

        paymentInformation: {
            cardholderName: '',
            cardholderNumber: '',
            date: '',
            cvv: '',
            remember: false
        },

        socialSecurityInformation: {
            class: null,
            wagon: null,
            seat: null
        },

        recurrentPaymentInformation: {
            class: null,
            wagon: null,
            seat: null
        },
    };

    private recurrentPaymentComplete = new Subject<any>();

    recurrentPaymentComplete$ = this.recurrentPaymentComplete.asObservable();

    getEmployeeInformation() {
        return this.employeeInformation;
    }

    setEmployeeInformation(employeeInformation: any) {
        this.employeeInformation = employeeInformation;
    }

    complete() {
        this.recurrentPaymentComplete.next(this.employeeInformation.personalInformation);
    }
}
