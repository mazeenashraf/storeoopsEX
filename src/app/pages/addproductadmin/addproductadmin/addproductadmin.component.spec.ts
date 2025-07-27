import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductadminComponent } from './addproductadmin.component';

describe('AddproductadminComponent', () => {
  let component: AddproductadminComponent;
  let fixture: ComponentFixture<AddproductadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddproductadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
