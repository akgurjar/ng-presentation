import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenterPageComponent } from './presenter-page.component';

describe('PresenterPageComponent', () => {
  let component: PresenterPageComponent;
  let fixture: ComponentFixture<PresenterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
