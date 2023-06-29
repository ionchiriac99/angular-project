import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

import {MemoryComponent} from './memory.component';
import {CardComponent} from './card/card.component';

const routes: Routes = [
	{
		path: '',
		component: MemoryComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, MatIconModule, MatButtonModule],
	declarations: [MemoryComponent, CardComponent],
	exports: [MemoryComponent],
})
export class MemoryModule {}
