import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {GithubComponent} from './github.component';
import {FormFieldErrorModule} from 'src/app/shared/form-field-error/form-field-error.module';
import {CommonModule} from '@angular/common';
import {UsernameFormComponent} from './username-form/username-form.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RepositoryCardComponent} from './repository-card/repository-card.component';

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
	],
	exports: [GithubComponent],
	declarations: [GithubComponent, UsernameFormComponent, UserProfileComponent, RepositoryCardComponent],
})
export class GithubModule {}
