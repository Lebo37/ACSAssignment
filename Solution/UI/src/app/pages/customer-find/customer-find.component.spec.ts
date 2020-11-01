import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFindComponent } from './customer-find.component';

describe('CustomerFindComponent', () => {
  let component: CustomerFindComponent;
  let fixture: ComponentFixture<CustomerFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
