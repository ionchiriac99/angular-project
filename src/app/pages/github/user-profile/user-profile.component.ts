import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, tap, mergeMap} from 'rxjs';

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
		private router: Router,
		private readonly route: ActivatedRoute,
		private readonly httpClient: HttpClient
	) {}

	public ngOnInit(): void {
		const slug$ = this.route.params.pipe(map((param: Params) => param['username']));
		slug$
			.pipe(
				mergeMap((username: string) => {
					console.log(`username: ${username}`);
					return this.httpClient.get<any>(`${this.API}/${username}`);
				}),
				tap((data) => {
					console.log('data: ', data);
					if (data) {
						this.data = data;
					} else {
						this.router.navigateByUrl('/github');
					}
				}),
				map((data) => data.repos_url),
				mergeMap((repos) => this.httpClient.get<any>(`${repos}?page=1&per_page=5`)),
				tap((data) => {
					console.log(data);
					this.repos = data;
				})
			)
			.subscribe();
	}
}
