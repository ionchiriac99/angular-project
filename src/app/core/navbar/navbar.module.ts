import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import {NavbarComponent} from './navbar.component';
import {SettingThemeComponent} from './setting-theme/setting-theme.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	imports: [RouterModule, MatButtonModule, MatIconModule],
	declarations: [NavbarComponent, SettingThemeComponent],
	exports: [NavbarComponent],
})
export class NavbarModule {}
