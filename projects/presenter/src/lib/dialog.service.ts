import { Injectable, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PrDialog {
	private _contRef: ViewContainerRef = null;
	private _pendingResolve: any = null;
	activeDialog: PrDialogRef = null;
	constructor(
		private cfr: ComponentFactoryResolver,
		private injector: Injector
	) {
		//
	}
	_setContainer(_contRef: ViewContainerRef) {
		let workToDo = false;
		if (this._contRef === null && this._pendingResolve) {
			workToDo = true;
		}
		this._contRef = _contRef;
		if (workToDo) {
			this._pendingResolve();
		}
	}
	open(component: any, data?: any): Promise<PrDialogRef> {
		return new Promise((resolve, reject ) => {
			if (!component) {
				return reject(new Error(`component argument should be a component but found ${component}`));
			}
			if (this._contRef) {
				this._resolveOpen(component, data, resolve);
			} else {
				this._pendingResolve = this._resolveOpen.bind(this, component, data, resolve);
			}
		});
	}
	private _resolveOpen(component: any, data: any, done: (dialogRef: PrDialogRef) => void) {
		this._contRef.clear();
		const cmpFactory = this.cfr.resolveComponentFactory(component);
		const dialogRef = new PrDialogRef(this._contRef, data);
		const injector = Injector.create([
			{ provide: PrDialogRef, useValue: dialogRef }
		], this.injector);
		this._contRef.createComponent(cmpFactory, 0, injector);
		this._pendingResolve = null;
		this.activeDialog = dialogRef;
		dialogRef.onclose.subscribe(() => {
			this.activeDialog = null;
		});
		done(dialogRef);
	}
}

export class PrDialogRef {
	private _dataFlow: Subject<any> = new Subject();
	constructor (
		private _cont: ViewContainerRef,
		public data: any
	) {}
	close(data?: any): void {
		this._dataFlow.next(data);
		this._cont.clear();
	}
	get onclose(): Observable<any> {
		return this._dataFlow.pipe(publishReplay(), refCount());
	}
}
