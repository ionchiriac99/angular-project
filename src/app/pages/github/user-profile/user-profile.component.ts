import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, tap, mergeMap, of} from 'rxjs';

@Component({
	selector: 'user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
	public data: any;
	public repos: any;

	private API: string = 'https://api.github.com/users';

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly httpClient: HttpClient,
		private readonly snackBar: MatSnackBar
	) {}

	public ngOnInit(): void {
		const slug$ = this.route.params.pipe(map((param: Params) => param['username']));
		slug$
			.pipe(
				mergeMap((username: string) => {
					return this.httpClient.get<any>(`${this.API}/${username}`);
				}),
				tap((data) => (this.data = data)),
				map((data) => data?.repos_url),
				mergeMap((repos) => {
					if (repos) {
						return this.httpClient.get<any>(`${repos}?page=1&per_page=5`);
					} else {
						return of(null);
					}
				}),
				tap((data) => (this.repos = data))
			)
			.subscribe({
				error: (e: HttpErrorResponse) => {
					this.snackBar.open(`Error ${e.status}: ${e.error.message}`, 'Close', {
						duration: 3000,
					});
					this.router.navigateByUrl('/github');
					return null;
				},
			});
	}
}
