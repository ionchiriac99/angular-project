import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ResultDialogComponent} from './result-dialog/result-dialog.component';

@Component({
	selector: 'tic-tac-toe',
	templateUrl: './tic-tac-toe.component.html',
	styleUrls: ['./tic-tac-toe.component.scss'],
})
export class TicTacToeComponent {
	@ViewChildren('div') viewChildren: QueryList<ElementRef>;

	private player: string = 'x';
	private counter = 0;
	private rulesWin: number[][] = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];
	private playerX: number[] = [];
	private playerO: number[] = [];

	public statistic: any = {
		x: 0,
		o: 0,
		equality: 0,
	};

	constructor(private readonly dialog: MatDialog) {}

	public onClick(element: HTMLElement, position: number): void {
		if (!element.innerText) {
			element.innerText = this.player;
			++this.counter;

			if (this.player === 'x') {
				this.playerX.push(position);
			} else {
				this.playerO.push(position);
			}

			if (this.counter >= 5) {
				if (this.checkWin()) {
					return;
				}

				if (this.counter === 9 && !this.checkWin()) {
					this.resultDialog(false);
					this.statistic['equality']++;
					this.reset();
					return;
				}
			}

			this.player = this.player === 'x' ? 'o' : 'x';
		}
	}

	private checkWin(): boolean {
		const win = this.checkPlayerWin(this.player);

		if (win) {
			this.resultDialog(win);
			this.statistic[this.player]++;
			this.reset();
		}

		return win;
	}

	private resultDialog(win: boolean): void {
		if (win) {
			this.dialog.open(ResultDialogComponent, {
				backdropClass: 'blurred',
				data: `The player ${this.player.toUpperCase()} win. Congratulations!!!`,
				disableClose: true,
			});
		} else {
			this.dialog.open(ResultDialogComponent, {
				backdropClass: 'blurred',
				data: 'Oops!? Equality...',
				disableClose: true,
			});
		}

		setTimeout(() => {
			this.dialog.closeAll();
		}, 1000);
	}

	private checkPlayerWin(player: string): boolean {
		let win: boolean;
		if (player === 'x') {
			win =
				this.rulesWin.filter((rule) => {
					if (rule.every((el) => this.playerX.includes(el))) {
						return true;
					}
					return false;
				})[0]?.length == 3;
		} else {
			win =
				this.rulesWin.filter((rule) => {
					if (rule.every((el) => this.playerO.includes(el))) {
						return true;
					}
					return false;
				})[0]?.length == 3;
		}
		return win;
	}

	private reset(): void {
		this.counter = 0;
		this.player = 'x';
		this.playerX = [];
		this.playerO = [];
		this.viewChildren.forEach((el) => {
			el.nativeElement.innerText = '';
		});
	}
}
