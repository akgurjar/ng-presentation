import {
	Component,
	ViewContainerRef,
	ContentChildren,
	QueryList,
	ViewChild,
	AfterContentInit,
	HostBinding,
	HostListener,
	Input,
	OnDestroy
} from '@angular/core';
import { PresenterPageComponent } from './presenter-page/presenter-page.component';
import { PrDialog } from './dialog.service';

@Component({
	selector: 'pr-presenter',
	templateUrl: './presenter.component.html',
	styleUrls: ['./presenter.component.scss']
})
export class PresenterComponent implements AfterContentInit, OnDestroy {
	isOverlay = true;
	isControlVisible = true;
	isFullScreenMode = false;
	isPresentationMode = false;
	currentPage: PresenterPageComponent = null;
	currentPageTitle = null;
	currentPageIndex = 0;
	get isPageTitle (): boolean {
		if (this.currentPage && this.currentPage.label !== null) {
			return true;
		}
		return false;
	}
	@Input() label = 'Presentation';
	@Input() icon = null;

	@HostBinding('attr.tabindex') _tabindex = 0;
	@HostBinding('attr.data-target') _eventDetectingText = 'pce'; // page change event

	@ViewChild('page', { read: ViewContainerRef }) _container: ViewContainerRef;
	@ViewChild('overlay', { read: ViewContainerRef }) _overlay: ViewContainerRef;

	@ContentChildren(PresenterPageComponent) _pages: QueryList<PresenterPageComponent>;
	get hasNextPage(): boolean {
		return this.currentPage !== this._pages.last;
	}
	get hasPrevPage(): boolean {
		return this.currentPage !== this._pages.first;
	}
	_pagesArray: PresenterPageComponent[] = null;
	fullScreenHandler = this.onFullScreenChangeHandler.bind(this);
	constructor(public dialog: PrDialog) {
		document.addEventListener('fullscreenchange', this.fullScreenHandler);
	}

	ngAfterContentInit () {
		this.dialog._setContainer(this._overlay);
		this._pages.notifyOnChanges();
		this._pagesArray = this._pages.toArray();
		this._pages.changes.subscribe(() => {
			if (this._pages.length > 0) {
				this._pagesArray = this._pages.toArray();
				const currentPageIndex = this._pagesArray.indexOf(this.currentPage);
				if (currentPageIndex !== -1) {
					this.currentPageIndex = currentPageIndex;
				} else {
					if (this.currentPageIndex < this._pagesArray.length) {
						this.onChangePage(this._pagesArray[this.currentPageIndex > 0 ? this.currentPageIndex - 1 : this.currentPageIndex]);
					} else {
						this.onChangePage(this._pages.last);
					}
				}
			}
		});
		if (this._pages.length > 0) {
			this.onChangePage(this._pages.first);
		}
	}

	@HostListener('keydown', ['$event'])
	onKeyPress(event: KeyboardEvent) {
		const target: HTMLElement = event.target as HTMLElement;
		if (target.getAttribute('data-target') === 'pce') { // page change event
			if (event.key === 'ArrowLeft') {
				this.onPreviousPage();
			} else if (event.key === 'ArrowRight') {
				this.onNextPage();
			}
		}
	}
	onChangePage (page: PresenterPageComponent) {
		if (page) {
			this._container.clear();
			this.currentPage = page;
			this.currentPageTitle = page.label;
			this.currentPageIndex = this._pagesArray.indexOf(page);
			this._container.createEmbeddedView(page._template);
		}
	}
	onNextPage () {
		if (this.hasNextPage) {
			this.onChangePage(this._pagesArray[this.currentPageIndex + 1]);
		} else {
			console.log('It is last page already');
		}
	}
	onPreviousPage () {
		if (this.hasPrevPage) {
			this.onChangePage(this._pagesArray[this.currentPageIndex - 1]);
		} else {
			console.log('It is first page already');
		}
	}
	onOverlayClicked () {
		if (this.dialog.activeDialog) {
			this.dialog.activeDialog.close();
		}
	}
	onFullScreenChangeHandler() {
		this.isPresentationMode = !this.isPresentationMode;
	}
	onTogglePresentationMode() {
		if (this.isPresentationMode) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	}
	ngOnDestroy() {
		document.removeEventListener('fullscreenchange', this.fullScreenHandler);
	}
}
