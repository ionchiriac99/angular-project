import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'github',
		loadChildren: () => import('../pages/github/github.module').then((m) => m.GithubModule),
	},
	{
		path: 'tic-tac-toe',
		loadChildren: () => import('../pages/tic-tac-toe/tic-tac-toe.module').then((m) => m.TicTacToeModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RoutingModule {}
