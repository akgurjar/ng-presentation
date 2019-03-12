import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenterComponent } from './presenter.component';
import { PresenterPageComponent } from './presenter-page/presenter-page.component';
import { PrDialog } from './dialog.service';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule
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
