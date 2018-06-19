import {
	Component,
	Input,
	ViewChild,
	TemplateRef
} from '@angular/core';

@Component({
	selector: 'pr-presenter-page',
	template: `
		<ng-template>
			<ng-content></ng-content>
		</ng-template>
	`
})
export class PresenterPageComponent {
	@Input() label = null;
	@ViewChild(TemplateRef) _template: TemplateRef<any>;
	constructor() { }
}
