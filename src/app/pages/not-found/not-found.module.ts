import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import {NotFoundComponent} from './not-found.component';

const routes: Routes = [
	{
		path: '',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), MatButtonModule],
	exports: [NotFoundComponent],
	declarations: [NotFoundComponent],
})
export class NotFoundModule {}
