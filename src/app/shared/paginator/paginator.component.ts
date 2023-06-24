import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

export interface Page {
	label: string | number;
	value: number;
}

@Component({
	selector: 'paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
	@Output() currentPageEvent: EventEmitter<number> = new EventEmitter();

	public pages: Page[] = [];
	private maxPage: number;

	private _currentPage: number;
	private _totalPages: number;

	public get currentPage(): number {
		return this._currentPage;
	}
	public get totalPages(): number {
		return this._totalPages;
	}

	@Input()
	public set currentPage(value: number) {
		this._currentPage = value;
		this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
	}

	@Input()
	public set totalPages(value: number) {
		this._totalPages = value;
		this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
	}

	ngOnInit(): void {
		this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
	}

	private createPageArray(currentPage: number, totalPages: number, paginationRange: number): Page[] {
		paginationRange = +paginationRange;
		const pages = [];
		this.maxPage = totalPages;
		const halfWay = Math.ceil(paginationRange / 2);

		const isStart = currentPage <= halfWay;
		const isEnd = this.maxPage - halfWay < currentPage;
		const isMiddle = !isStart && !isEnd;

		const ellipsesNeeded = paginationRange < this.maxPage;
		let i = 1;

		while (i <= this.maxPage && i <= paginationRange) {
			let label: any;
			const pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, this.maxPage);
			const openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
			const closingEllipsesNeeded = i === paginationRange - 1 && (isMiddle || isStart);

			if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
				label = '...';
			} else {
				label = pageNumber.toString();
			}

			pages.push({
				label,
				value: pageNumber,
			});
			i++;
		}
		return pages;
	}

	private calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number): number {
		const halfWay = Math.ceil(paginationRange / 2);
		if (i === paginationRange) {
			return totalPages;
		} else if (i === 1) {
			return i;
		} else if (paginationRange < totalPages) {
			if (totalPages - halfWay < currentPage) {
				return totalPages - paginationRange + i;
			} else if (halfWay < currentPage) {
				return currentPage - halfWay + i;
			} else {
				return i;
			}
		} else {
			return i;
		}
	}

	private range(): number {
		return this.currentPage > 3 ? 7 : 5;
	}

	public next(): void {
		if (this.maxPage > 1 && this.currentPage != this.maxPage) {
			if (this.currentPage < this.maxPage) {
				this.currentPage++;
			}
			this.currentPageEvent.emit(this.currentPage);
			this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
		}
	}

	public prev(): void {
		if (this.maxPage > 1 && this.currentPage != 1) {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
			this.currentPageEvent.emit(this.currentPage);
			this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
		}
	}

	public toPage(page: number): void {
		if (this.currentPage != page) {
			this.currentPage = page;
			this.currentPageEvent.emit(this.currentPage);
			this.pages = this.createPageArray(this.currentPage, this.totalPages, this.range());
		}
	}
}
