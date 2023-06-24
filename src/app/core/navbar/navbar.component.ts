import {Component} from '@angular/core';
import {ColorModeService} from '../services/color-mode.services';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	constructor(private readonly colorModeService: ColorModeService) {}

	public setLight(): void {
		this.colorModeService.setLight();
	}

	public setDark(): void {
		this.colorModeService.setDark();
	}
}
