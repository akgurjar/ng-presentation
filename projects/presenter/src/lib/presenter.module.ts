import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenterComponent } from './presenter.component';
import { PresenterPageComponent } from './presenter-page/presenter-page.component';
import { PrDialog } from './dialog.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		PresenterComponent,
		PresenterPageComponent,
	],
	exports: [
		PresenterComponent,
		PresenterPageComponent,
	],
	providers: [
		PrDialog
	]
})
export class PresenterModule { }
