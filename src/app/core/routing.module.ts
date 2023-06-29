import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'github',
		loadChildren: () => import('../pages/github/github.module').then((m) => m.GithubModule),
	},
	{
		path: 'tic-tac-toe',
		loadChildren: () => import('../pages/tic-tac-toe/tic-tac-toe.module').then((m) => m.TicTacToeModule),
	},
	{
		path: 'memory',
		loadChildren: () => import('../pages/memory/memory.module').then((m) => m.MemoryModule),
	},
	{
		path: '**',
		loadChildren: () => import('../pages/not-found/not-found.module').then((m) => m.NotFoundModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RoutingModule {}
