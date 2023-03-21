import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteUploadComponent } from './complete-upload.component';

describe('CompleteUploadComponent', () => {
  let component: CompleteUploadComponent;
  let fixture: ComponentFixture<CompleteUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
