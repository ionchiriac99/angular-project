import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
	selector: 'username-form',
	templateUrl: './username-form.component.html',
	styleUrls: ['./username-form.component.scss'],
})
export class UsernameFormComponent implements OnInit {
	public form: FormGroup;

	constructor(private router: Router) {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(39),
				Validators.pattern(new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)),
			]),
		});
	}

	public submit(): void {
		const username = this.form.get('username').value;
		this.router.navigateByUrl(`/github/${username}`);
	}
}
