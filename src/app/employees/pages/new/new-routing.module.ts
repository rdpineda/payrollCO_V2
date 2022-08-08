import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { NewComponent } from './new.component';
import { PersonalComponent } from './personal/personal.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: NewComponent, children:[
				{path:'', redirectTo: 'new/personal', pathMatch: 'full'},
				{path: 'new/personal', component: PersonalComponent}
				
			]}
		])
	],
	exports: [
		RouterModule
	]
})
export class NewEmployeeRoutingModule {}