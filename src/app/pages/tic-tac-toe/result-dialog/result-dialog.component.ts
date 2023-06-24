import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	templateUrl: './result-dialog.component.html',
	styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public result: string) {}
}
