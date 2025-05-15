import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmpBreakdownComponent } from './lmp-breakdown.component';

describe('LmpBreakdownComponent', () => {
  let component: LmpBreakdownComponent;
  let fixture: ComponentFixture<LmpBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmpBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmpBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
