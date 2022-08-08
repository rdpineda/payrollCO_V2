import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;  
  public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

  cargarTipoContrato(){
    let url = this.URL_SERVICIOS + '/contractTypes';
    return this.http.get( url, {headers: this.headers} )
         .map( (resp: any) => {
          return resp;
        });
  }
  obtenerTipoContrato( id: string ){
    let url = this.URL_SERVICIOS + '/contractTypes/' + id;
    
    return this.http.get( url, {headers: this.headers} )
    
        .map( (resp: any ) => resp );
    

  }


}