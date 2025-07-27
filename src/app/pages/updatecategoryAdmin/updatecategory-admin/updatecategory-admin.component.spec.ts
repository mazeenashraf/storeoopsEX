import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecategoryAdminComponent } from './updatecategory-admin.component';

describe('UpdatecategoryAdminComponent', () => {
  let component: UpdatecategoryAdminComponent;
  let fixture: ComponentFixture<UpdatecategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecategoryAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
