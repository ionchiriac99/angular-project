import {Component, Input} from '@angular/core';

@Component({
	selector: 'repository-card',
	templateUrl: './repository-card.component.html',
	styleUrls: ['./repository-card.component.scss'],
})
export class RepositoryCardComponent {
	@Input()
	public repository: any;
}
