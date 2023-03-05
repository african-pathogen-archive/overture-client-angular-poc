import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyModalComponent } from './study-modal.component';

describe('StudyModalComponent', () => {
  let component: StudyModalComponent;
  let fixture: ComponentFixture<StudyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
