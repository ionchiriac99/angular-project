import {NgModule} from '@angular/core';

import {NavbarComponent} from './navbar.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	imports: [RouterModule, MatButtonModule],
	exports: [NavbarComponent],
	declarations: [NavbarComponent],
})
export class NavbarModule {}
