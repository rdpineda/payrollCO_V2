import { Component, OnInit, VERSION  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { EmployeeService } from '../../services/employeeService.index';
import {MenuItem} from 'primeng/api';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  version = 'Angular: v' + VERSION.full;

  employee: any = {};
  items!: MenuItem[];

    scrollableItems!: MenuItem[];

    activeItem!: MenuItem;

    activeItem2!: MenuItem;

  constructor(private activatedRoute: ActivatedRoute,
              private _employeeService: EmployeeService,
              public _modalUploadServices: ModalUploadService
              ) { 

                this.activatedRoute.params.subscribe( params =>{
                  this.cargarEmployees( params[ 'id' ]);
              });
              }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployees( params[ 'id' ]));
    });

    this.items = [
      {label: 'Personal', icon: 'pi pi-fw pi-home'},
      {label: 'Laboral', icon: 'pi pi-fw pi-calendar'},
      {label: 'Contrato', icon: 'pi pi-fw pi-pencil'},
      {label: 'Salario', icon: 'pi pi-fw pi-file'},
      {label: 'Puesto de Trabajo', icon: 'pi pi-fw pi-cog'},
      {label: 'Banco', icon: 'pi pi-fw pi-file'},
      {label: 'Seguridad Social', icon: 'pi pi-fw pi-cog'},
      {label: 'Recurrentes', icon: 'pi pi-fw pi-cog'}
  ];

  this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({ label: `Tab ${i + 1}`}));

  this.activeItem = this.items[0];

  this.activeItem2 = this.scrollableItems[0];
    
    
  }

  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          console.log('empleado',employee)
          this.employee = employee;
        });

  }

  

  

}
