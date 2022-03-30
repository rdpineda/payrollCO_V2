import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/authservice.index';
import { CompanyService } from '../../companies/services/companyService.index';

import { Usuario } from '../../auth/models/usuario.model';

import { Company } from '../../companies/models/company.model';

import { Router } from '@angular/router';
//import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
//import { CardCompanyComponent } from '../../components/card-company/card-company.component';
import Swal from 'sweetalert2';
import { Concept } from '../../companies/models/concept.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  correo: any;
  idCompany: any;
  isActive = true;
  idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';

  compa: any = {}
  companys: Company [] = [];
  usuario: Usuario;
  company: Company [] = [];
  concept: Concept[] = [];
  company1: any = {};
  company2: any = {};
  autenticado = 'n';
  registro: any = {};
  

  empresa: any = {};
  empresaseleccionada: any = {};
 
  items!: MenuItem[];

 

  constructor( public _usuarioService: AuthService,
               public _companyService: CompanyService,
              // public _modalUploadService:ModalUploadService,
               public router: Router) {

                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
                this.usuario = this._usuarioService.usuario;
                // this.cargarEmpresasUsuario(this.usuario.id);
                //this.company = this._usuarioService.empresas;
                this.company =  JSON.parse(localStorage.getItem('empresas')!);
                
                
                if (this.empresaseleccionada) {
                 
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                
                 
                } else {
                  if(this.company.length > 1 ){
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                   
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  
                  }
                }
                
            
                this.cargarCompanySelect(this.empresa.id);
                
               
               }

  ngOnInit(): void {

    this.items = [
      

      {
          items: [{
                  label: 'Mi perfil', 
                  icon: 'pi pi-fw pi-plus',
              },
              {label: 'Cambiar Empresa'},
              {label: 'Suscripción'},
              {label: 'Logout'},
          ]
      },
      
  
  ]; 
  
   /*  this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id)); */

    

  }

  

  buscar( termino: string){
      this.router.navigate(['/busqueda', termino]);
  }

  vercompany( event: any ){
    this.compa = JSON.stringify(event.empresa);
  }

  /* cargarEmpresasUsuario(id: string){
    this._companyService.cargarCompanysUser(id)
    .subscribe ( resp => this.companys1 = resp);
  } */

  cargarCompanySelect(id: string){
    this._companyService.cargarCompanys(id)
        .subscribe ( resp => {
          this.company1 = resp;
        });
  } 

  cargarEmpresasUsuario(iduser: string){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( resp => this.company2 = resp);
    
  }

/*   crearEmpresa(){
    Swal.fire({
      title: 'Ingrese el nombre de la Compañia',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if ( !value || value.length === 0) {
          return 'No ha ingresado ningun dato';
        }
       
      
        


            const form = [
              {
        
                companyName:value,
                isActive: this.isActive,
                user_id: this.usuario.id,
                
                
              }
            ]
        
            this.registro =  JSON.parse(JSON.stringify(form[0]));

            //mirar aca
            console.log(this.registro)
            this._companyService.crearCompany( this.registro )
            .subscribe(respc => {
              this.cargarEmpresasUsuario(this.usuario.id);
              this.router.navigate( ['/companies'] );
           
            });
  }
  
});
    
  } */



 



}
