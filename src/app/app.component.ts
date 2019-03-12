import { Component } from '@angular/core';
import { PrDialog } from 'presenter';
import { DialogComponent } from './dialog/dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	courseName = 'Angular 7';
	courseIcon = 'favicon.ico';
	constructor(private _dialog: PrDialog) { }
	onDialogHandler() {
		this._dialog.open(DialogComponent);
	}
}
