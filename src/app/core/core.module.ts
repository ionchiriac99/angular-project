import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoutingModule} from './routing.module';
import {NavbarModule} from './navbar/navbar.module';

@NgModule({
	imports: [CommonModule, RoutingModule, NavbarModule],
	exports: [RoutingModule, NavbarModule],
	declarations: [],
	providers: [],
})
export class CoreModule {}
