import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderAdminComponent } from './view-order-admin.component';

describe('ViewOrderAdminComponent', () => {
  let component: ViewOrderAdminComponent;
  let fixture: ComponentFixture<ViewOrderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
