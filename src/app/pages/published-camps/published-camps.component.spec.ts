import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCampsComponent } from './published-camps.component';

describe('PublishedCampsComponent', () => {
  let component: PublishedCampsComponent;
  let fixture: ComponentFixture<PublishedCampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedCampsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishedCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
