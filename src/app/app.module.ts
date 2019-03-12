import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PresenterModule } from 'projects/presenter/src/public_api';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		DialogComponent
	],
	imports: [
		BrowserModule,
		PresenterModule
	],
	providers: [],
	entryComponents: [DialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
