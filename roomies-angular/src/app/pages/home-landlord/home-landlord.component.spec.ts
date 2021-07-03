import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLandlordComponent } from './home-landlord.component';

describe('HomeLandlordComponent', () => {
  let component: HomeLandlordComponent;
  let fixture: ComponentFixture<HomeLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLandlordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
