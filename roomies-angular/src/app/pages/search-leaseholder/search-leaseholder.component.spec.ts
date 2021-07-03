import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeaseholderComponent } from './search-leaseholder.component';

describe('SearchLeaseholderComponent', () => {
  let component: SearchLeaseholderComponent;
  let fixture: ComponentFixture<SearchLeaseholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLeaseholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLeaseholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
