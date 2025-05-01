import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationHistoryDialogComponent } from './donation-history-dialog.component';

describe('DonationHistoryDialogComponent', () => {
  let component: DonationHistoryDialogComponent;
  let fixture: ComponentFixture<DonationHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationHistoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
