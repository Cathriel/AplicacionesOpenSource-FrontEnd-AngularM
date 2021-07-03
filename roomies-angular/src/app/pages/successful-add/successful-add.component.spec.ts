import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulAddComponent } from './successful-add.component';

describe('SuccessfulAddComponent', () => {
  let component: SuccessfulAddComponent;
  let fixture: ComponentFixture<SuccessfulAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
