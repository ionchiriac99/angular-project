import {Component, Renderer2} from '@angular/core';
import {CardComponent} from './card/card.component';

export interface ICard {
	element: string;
	index: number;
}

@Component({
	templateUrl: './memory.component.html',
	styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent {
	public cards: string[] = ['euro_symbol', 'my_location', 'local_police', 'favorite', 'speed', 'add'];
	public suffledCard: ICard[] = [];
	public turns: number = 0;
	public running: boolean = false;

	private remained: number = 12;
	private firstChoise: CardComponent = undefined;
	private secondChoise: CardComponent = undefined;

	constructor(private readonly renderer: Renderer2) {}

	public newGame(): void {
		this.resetAll();

		const suffledCard = [...this.cards, ...this.cards]
			.map((element) => ({element, index: Math.random()}))
			.sort((a, b) => a.index - b.index);
		this.suffledCard = suffledCard;
	}

	// TODO: implement throttle click to card
	public onMove(element: CardComponent): void {
		this.turns++;

		if (this.firstChoise == undefined && this.secondChoise == undefined) {
			this.firstChoise = element;
			this.renderer.addClass(element.ref.nativeElement, 'turned');
		} else if (this.firstChoise) {
			if (element.card.index === this.firstChoise.card.index) {
				this.firstChoise = undefined;
				this.renderer.removeClass(element.ref.nativeElement, 'turned');
			} else {
				this.renderer.addClass(element.ref.nativeElement, 'turned');
				this.secondChoise = element;
				setTimeout(() => {
					this.checkPair();
				}, 500);
			}
		}
	}

	private checkPair(): void {
		if (this.firstChoise.card.element === this.secondChoise.card.element) {
			this.remained -= 2;
			this.renderer.addClass(this.secondChoise.ref.nativeElement, 'solved');
			this.renderer.addClass(this.firstChoise.ref.nativeElement, 'solved');
			setTimeout(() => {
				this.checkWin();
			}, 500);
		} else {
			this.renderer.removeClass(this.firstChoise.ref.nativeElement, 'turned');
			this.renderer.removeClass(this.secondChoise.ref.nativeElement, 'turned');
		}

		this.firstChoise = undefined;
		this.secondChoise = undefined;
	}

	private checkWin(): void {
		if (this.remained === 0) {
			this.resetAll();
			this.running = false;
		}
	}

	private resetAll(): void {
		this.remained = 12;
		this.turns = 0;
		this.running = true;
		this.suffledCard = [];
		this.firstChoise = undefined;
		this.secondChoise = undefined;
	}
}
