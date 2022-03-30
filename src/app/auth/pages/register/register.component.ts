
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Concept } from '../../../companies/models/concept.model';
import { Company } from '../../../companies/models/company.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/authservice.index';
import { ConceptService } from '../../../companies/services/companyService.index';
import { CompanyService } from '../../../companies/services/companyService.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  
  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  idCompany: any;
  registro: any = {};
  concept: Concept[] = [];
  isActive = true;

  //forma: FormGroup;

  formaRegister: FormGroup = this.fb.group({
    name       : ['', [Validators.required]],
    companyName      : ['', [Validators.required]],
    email       : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    cellPhone     : ['', [Validators.required]],
    password   : ['', Validators.required],
    condiciones  : ['']
  });

  constructor( public _usuarioService: AuthService,
    public _conceptService: ConceptService,
    public _companyService: CompanyService,
    public _router: Router,
    private fb: FormBuilder ) {
    this.cargarConcept();
    }

  ngOnInit(): void {
  }

  registrarUsuario() {

    if (this.formaRegister.invalid){

      return Object.values (this.formaRegister.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
      });
    }

    if ( !this.formaRegister.value.condiciones){
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        icon: 'warning'
      });
      return;
    }



    const form = [
      {

        name: this.formaRegister.value.name,
        userName: this.formaRegister.value.email,
        password: this.formaRegister.value.password,
        isActive: this.isActive,
        cellPhone: this.formaRegister.value.cellPhone,
        companyName: this.formaRegister.value.companyName
        
      }
    ]

    this.registro =  JSON.parse(JSON.stringify(form[0]));
    this._usuarioService.crearUsuario( this.registro )
          .subscribe( resp => {
            this._router.navigate(['/auth/login']);
          });


  }

  cargarConcept() {
    this._conceptService.cargarConcept()
        .subscribe( concept => {
          this.concept = concept;
        });

  }

  campoEsValido( campo: string){
    return this.formaRegister.controls[campo].errors 
        && this.formaRegister.controls[campo].touched
  }

}
