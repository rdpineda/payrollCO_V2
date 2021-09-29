import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { EmployeeService } from '../../services/employeeService.index';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  employee: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private _employeeService: EmployeeService,
              public _modalUploadServices: ModalUploadService) { 

                this.activatedRoute.params.subscribe( params =>{
                  this.cargarEmployees( params[ 'id' ]);
              });
              }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployees( params[ 'id' ]));
    });

    
  }

  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          console.log('empleado',employee)
          this.employee = employee;
        });

  }

  

}
