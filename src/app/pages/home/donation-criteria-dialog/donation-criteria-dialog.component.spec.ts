import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCriteriaDialogComponent } from './donation-criteria-dialog.component';

describe('DonationCriteriaDialogComponent', () => {
  let component: DonationCriteriaDialogComponent;
  let fixture: ComponentFixture<DonationCriteriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationCriteriaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationCriteriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
