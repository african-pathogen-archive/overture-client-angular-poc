import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAnalysisModalComponent } from './submit-analysis-modal.component';

describe('SubmitAnalysisModalComponent', () => {
  let component: SubmitAnalysisModalComponent;
  let fixture: ComponentFixture<SubmitAnalysisModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitAnalysisModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAnalysisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
