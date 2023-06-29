import {Component, ElementRef, Input} from '@angular/core';
import {ICard} from '../memory.component';

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input()
	public card: ICard;

	constructor(public ref: ElementRef) {}
}
