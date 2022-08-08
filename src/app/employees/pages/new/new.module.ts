import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewComponent} from './new.component';
import { NewEmployeeRoutingModule } from './new-routing.module';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';


import { PersonalComponent } from './personal/personal.component';


import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeNewService } from '../../services/employeeNew/employee-new.service';
import { PrimeNGModule } from '../../../prime-ng/prime-ng.module';

@NgModule({
	imports: [
		CommonModule,
		NewEmployeeRoutingModule,
		FormsModule,
        SharedModule,
        PrimeNGModule
	],
	declarations: [
		NewComponent,
		PersonalComponent
	
	],
	providers: [
		EmployeeNewService
	]
})
export class NewEmployeeModule {}