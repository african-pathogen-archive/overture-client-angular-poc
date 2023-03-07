import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisUploadComponent } from './analysis-upload.component';

describe('AnalysisUploadComponent', () => {
  let component: AnalysisUploadComponent;
  let fixture: ComponentFixture<AnalysisUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
