import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeaseholderComponent } from './home-leaseholder.component';


describe('HomeLeaseholderComponent', () => {
  let component: HomeLeaseholderComponent;
  let fixture: ComponentFixture<HomeLeaseholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLeaseholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeaseholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
