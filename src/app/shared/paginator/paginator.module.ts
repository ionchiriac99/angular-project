import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {PaginatorComponent} from './paginator.component';

@NgModule({
	imports: [CommonModule, MatIconModule],
	exports: [PaginatorComponent],
	declarations: [PaginatorComponent],
})
export class PaginatorModule {}
