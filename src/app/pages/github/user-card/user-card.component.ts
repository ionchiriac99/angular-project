import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
	@Input()
	public data: any;

	constructor(private readonly router: Router) {}

	public navigateTo(username: string): void {
		this.router.navigateByUrl(`/github/${username}`);
	}
}
