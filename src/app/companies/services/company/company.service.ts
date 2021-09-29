import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
// import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Company } from '../../models/company.model';
import { AuthService } from 'src/app/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  company!: Company;
  companyUser: any={};
  token!: string;
  

  constructor( public http: HttpClient, 
    
    public _usuarioService: AuthService,
    // public _subirArhivoService: SubirArhivoService,
    ) {

    
      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
     
     }


     

     cargarCompanys( id: string){

    
      let url = this.URL_SERVICIOS + '/companies/' + id;
      
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
           
            return resp
          });
          
    } 
    
    cargarCompanysUser( iduser: string){

      //let url = URL_SERVICIOS + '/company/' + iduser;
      let url = this.URL_SERVICIOS + '/users/' + iduser;
      
      
      
      return this.http.get( url, {headers: this.headers})

          .map( (resp: any) => {
            
            return resp
            
          });
          
          
          
          
}
}
