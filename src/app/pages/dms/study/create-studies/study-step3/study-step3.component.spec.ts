import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStep3Component } from './study-step3.component';

describe('StudyStep3Component', () => {
  let component: StudyStep3Component;
  let fixture: ComponentFixture<StudyStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
