import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudyDetailsComponent } from './view-study-details.component';

describe('ViewStudyDetailsComponent', () => {
  let component: ViewStudyDetailsComponent;
  let fixture: ComponentFixture<ViewStudyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
