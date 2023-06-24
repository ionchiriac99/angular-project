import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, of, map, mergeMap, tap} from 'rxjs';

@Component({
	selector: 'follow',
	templateUrl: './follow.component.html',
	styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
	public totalPages: number;
	public page: number = 1;
	public state: string = 'Followers';
	public username: string = 'test';
	public follow: any[] = [];
	public totalFollow: number;

	private items_per_page: number = 30;
	private API: string = 'https://api.github.com/users';

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly httpClient: HttpClient
	) {}

	public ngOnInit(): void {
		const page$ = this.route.queryParams.pipe(map((params) => Number(params['page'])));
		const route$ = this.route.params.pipe(
			map((param: Params) => {
				const username: string = param['username'];
				const state: string = param['state'];
				if (state !== 'followers' && state !== 'following') {
					this.router.navigateByUrl(`/github/${username}`);
				}
				this.state = state;
				return {
					username,
					state,
				};
			})
		);
		route$
			.pipe(
				tap((data) => {
					this.username = data.username;
					this.state = data.state;
				}),
				mergeMap(() => page$),
				tap((data) => {
					if (!isNaN(data)) {
						this.page = data;
					}
				}),
				mergeMap(() => {
					if (this.totalPages) {
						return of(null);
					} else {
						return this.httpUserRequest(this.username, this.state);
					}
				}),
				mergeMap(() => this.httpFollowRequest(this.username, this.state, this.page))
			)
			.subscribe();
	}

	public toPage(page: number): void {
		this.router.navigate(['.'], {relativeTo: this.route, queryParams: {page: page}});
	}

	public capitalize(str: string): string {
		return str[0].toUpperCase() + str.slice(1);
	}

	private httpUserRequest(username: string, state: string): Observable<any> {
		return this.httpClient.get<any>(`${this.API}/${username}`).pipe(
			tap((data) => {
				if (state === 'followers') {
					this.totalFollow = data.followers;
				}
				if (state === 'following') {
					this.totalFollow = data.following;
				}
			})
		);
	}

	private httpFollowRequest(username: string, state: string, page: number = 1): Observable<any> {
		if (page > this.totalPages) {
			page = this.totalPages;
		}

		const mapFn = (data: any[]) => {
			this.follow = data.map((el) => {
				return {
					login: el.login,
					avatar_url: el.avatar_url,
				};
			});

			this.totalPages = Math.ceil(this.totalFollow / this.items_per_page);
		};
		return this.httpClient
			.get<any>(`${this.API}/${username}/${state}?page=${page}`)
			.pipe(map((data) => mapFn(data)));
	}

	private httpRequest(username: string, state: string, page: number = 1): Observable<any> {
		const mapFn = (data: any[]) => {
			this.follow = data.map((el) => {
				return {
					login: el.login,
					avatar_url: el.avatar_url,
				};
			});

			this.totalPages = Math.ceil(this.totalFollow / this.items_per_page);
		};

		return this.httpClient.get<any>(`${this.API}/${username}`).pipe(
			tap((data) => {
				if (state === 'followers') {
					this.totalFollow = data.followers;
				}
				if (state === 'following') {
					this.totalFollow = data.following;
				}
			}),
			mergeMap(() => this.httpClient.get<any>(`${this.API}/${username}/${state}`)),
			map((data) => mapFn(data))
		);
	}
}
