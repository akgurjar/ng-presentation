![ScreenShot](https://raw.githubusercontent.com/akgurjar/ng-presentation/master/src/assets/screenshot.png)
# NG-Presenter
Angular library for Creating presentations on web.
### Installation
```
npm install ng-presenter or yarn add ng-presenter 
```
## How to use
### => Import module
```typescript
import { PresenterModule } from 'ng-presenter';
@NgModule({
    ......
    imports: [ PresenterModule ]
    ......
})
```
### => Template
```html
<pr-presenter label="Course Name" icon="icon url">
    <pr-presenter-page label="Welcome">
        <span>Welcome to my Course</span>
    </pr-presenter-page>
    <pr-presenter-page label="Course">
        <span>Course Content</span>
    </pr-presenter-page>
    <pr-presenter-page label="End">
        <span>Thank You</span>
    </pr-presenter-page>
</pr-presenter>
```
### => Opening a dialog box
```typescript
import { PrDialog, PrDialogRef } from 'ng-presenter';
import { DialogComponent } from './dialog/dialog.component';
@Component({
    ......
})
export class MyComponent implements AfterViewInit {
    constructor(public dialog: PrDialog) { }
    ngAfterViewInit () {
        const data = { text: 'A Dialog Box Text' };
        this.dialog.open(DialogComponent, data)
        .then((dialogRef: PrDialogRef) => {
            dialogRef.onClose.subscribe((data: any) => {
                console.log(data);
            });
        });
    }
}

// DialogComponent
export class DialogComponent {
    constructor(public dialogRef: PrDialogRef) {
        const data = dialogRef.data;
    }
    ngAfterViewInit () {
        const data = "Returning data";
        this.dialogRef.close(data);
    }
}
```
## Features
* Creating any number of presentation slide pages
* Opening a dialog upon slide pages