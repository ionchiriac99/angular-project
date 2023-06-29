import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormFieldErrorModule} from 'src/app/shared/form-field-error/form-field-error.module';
import {PaginatorModule} from 'src/app/shared/paginator/paginator.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {GithubComponent} from './github.component';
import {UsernameFormComponent} from './username-form/username-form.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RepositoryCardComponent} from './repository-card/repository-card.component';
import {AboutComponent} from './about/about.component';
import {UserCardComponent} from './user-card/user-card.component';

const routes: Routes = [
	{
		path: '',
		component: GithubComponent,
		children: [
			{
				path: ':username',
				component: UserProfileComponent,
			},
		],
	},
	{
		path: ':username/:state',
		component: AboutComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatInputModule,
		FormFieldErrorModule,
		MatButtonModule,
		MatIconModule,
		PaginatorModule,
		MatSnackBarModule,
	],
	exports: [GithubComponent],
	declarations: [
		GithubComponent,
		UsernameFormComponent,
		UserProfileComponent,
		RepositoryCardComponent,
		AboutComponent,
		UserCardComponent,
	],
})
export class GithubModule {}
