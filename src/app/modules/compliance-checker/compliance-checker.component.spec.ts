import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceCheckerComponent } from './compliance-checker.component';

describe('ComplianceCheckerComponent', () => {
  let component: ComplianceCheckerComponent;
  let fixture: ComponentFixture<ComplianceCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
