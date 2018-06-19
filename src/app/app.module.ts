import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PresenterModule } from 'presenter';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		PresenterModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
