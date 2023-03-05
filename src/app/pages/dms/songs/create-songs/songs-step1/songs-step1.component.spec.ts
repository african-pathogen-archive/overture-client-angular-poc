import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsStep1Component } from './songs-step1.component';

describe('SongsStep1Component', () => {
  let component: SongsStep1Component;
  let fixture: ComponentFixture<SongsStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
