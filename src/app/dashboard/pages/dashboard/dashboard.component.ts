import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Period } from 'src/app/payroll/models/period.model';
import { PeriodService } from '../../../payroll/services/payrollService.index';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  visibleSidebar2: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  period: any =[];
  empresa: any = {};
  company: any;
  yearPeriod!: number;
  Date = new Date();

  constructor( public _periodService: PeriodService,
               public _usuarioService: AuthService,
               public router: Router) { 


    this.company = this._usuarioService.empresas;
    console.log(this.company, 'dashboar')
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

    this.yearPeriod = new Date().getFullYear();
     this.createdPeriod(this.empresa.id, this.yearPeriod) 
    this.getPeriodByProcess( this.empresa.id )
    console.log(this.yearPeriod, 'const')
  }

 
  ngOnInit(): void {

    
    
    
    /* this.getPeriodByProcess( this.empresa.id ) */
    
  
  }

  
  getPeriodByProcess( id: string ) {
    
    this._periodService.getPeriodByCompanyByProcess( id )
        .subscribe( (period: any) => {
          this.period[0] = period[0];
          console.log('periodo', this.period[0].number, this.period[0])
        });

  }

  createdPeriod(id: string, year:number) {
    this._periodService.createPeriod(id, year)
        .subscribe((periodCreated: any) => {})
  }

  

}
