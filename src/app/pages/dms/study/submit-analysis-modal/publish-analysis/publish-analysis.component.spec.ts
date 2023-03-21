import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishAnalysisComponent } from './publish-analysis.component';

describe('PublishAnalysisComponent', () => {
  let component: PublishAnalysisComponent;
  let fixture: ComponentFixture<PublishAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
