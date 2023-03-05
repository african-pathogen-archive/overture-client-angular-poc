import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStep2Component } from './study-step2.component';

describe('StudyStep2Component', () => {
  let component: StudyStep2Component;
  let fixture: ComponentFixture<StudyStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
