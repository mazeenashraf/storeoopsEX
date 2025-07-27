import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllordersadminComponent } from './allordersadmin.component';

describe('AllordersadminComponent', () => {
  let component: AllordersadminComponent;
  let fixture: ComponentFixture<AllordersadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllordersadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllordersadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
