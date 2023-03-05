import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStep1Component } from './study-step1.component';

describe('StudyStep1Component', () => {
  let component: StudyStep1Component;
  let fixture: ComponentFixture<StudyStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
