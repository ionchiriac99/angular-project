import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {GeneralDescriptionComponent} from './general-description/general-description.component';
import {GithubDescriptionComponent} from './github-description/github-description.component';
import {MemoryDescriptionComponent} from './memory-description/memory-description.component';
import {TicTacToeDescriptionComponent} from './tic-tac-toe-description/tic-tac-toe-description.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [
		HomeComponent,
		GeneralDescriptionComponent,
		GithubDescriptionComponent,
		MemoryDescriptionComponent,
		TicTacToeDescriptionComponent,
	],
	exports: [HomeComponent],
})
export class HomeModule {}
