import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoryAdminComponent } from './addcategory-admin.component';

describe('AddcategoryAdminComponent', () => {
  let component: AddcategoryAdminComponent;
  let fixture: ComponentFixture<AddcategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcategoryAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
