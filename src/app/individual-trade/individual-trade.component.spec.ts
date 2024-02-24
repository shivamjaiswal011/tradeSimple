import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTradeComponent } from './individual-trade.component';

describe('IndividualTradeComponent', () => {
  let component: IndividualTradeComponent;
  let fixture: ComponentFixture<IndividualTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
