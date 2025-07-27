import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcategoriesAdminComponent } from './allcategories-admin.component';

describe('AllcategoriesAdminComponent', () => {
  let component: AllcategoriesAdminComponent;
  let fixture: ComponentFixture<AllcategoriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcategoriesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
