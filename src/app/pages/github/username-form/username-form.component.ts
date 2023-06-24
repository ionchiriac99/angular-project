import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'username-form',
	templateUrl: './username-form.component.html',
	styleUrls: ['./username-form.component.scss'],
})
export class UsernameFormComponent implements OnInit {
	public form: FormGroup;

	constructor(private router: Router, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			username: new FormControl('', [Validators.minLength(4)]),
		});
	}

	public submit(): void {
		const username = this.form.get('username').value;
		this.router.navigateByUrl(`/github/${username}`);
	}
}
