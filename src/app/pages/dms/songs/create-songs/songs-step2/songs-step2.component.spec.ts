import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsStep2Component } from './songs-step2.component';

describe('SongsStep2Component', () => {
  let component: SongsStep2Component;
  let fixture: ComponentFixture<SongsStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
