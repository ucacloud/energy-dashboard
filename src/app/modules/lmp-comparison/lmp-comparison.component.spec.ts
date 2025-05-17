import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmpComparisonComponent } from './lmp-comparison.component';

describe('LmpComparisonComponent', () => {
  let component: LmpComparisonComponent;
  let fixture: ComponentFixture<LmpComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmpComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmpComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
