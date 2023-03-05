import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsStep3Component } from './songs-step3.component';

describe('SongsStep3Component', () => {
  let component: SongsStep3Component;
  let fixture: ComponentFixture<SongsStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
