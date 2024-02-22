import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradelogComponent } from './tradelog.component';

describe('TradelogComponent', () => {
  let component: TradelogComponent;
  let fixture: ComponentFixture<TradelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradelogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
