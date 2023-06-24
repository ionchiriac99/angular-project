import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

import {TicTacToeComponent} from './tic-tac-toe.component';
import {ResultDialogComponent} from './result-dialog/result-dialog.component';

const routes: Routes = [
	{
		path: '',
		component: TicTacToeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), MatDialogModule],
	exports: [TicTacToeComponent],
	declarations: [TicTacToeComponent, ResultDialogComponent],
})
export class TicTacToeModule {}
