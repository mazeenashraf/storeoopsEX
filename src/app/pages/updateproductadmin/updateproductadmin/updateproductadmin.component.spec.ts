import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductadminComponent } from './updateproductadmin.component';

describe('UpdateproductadminComponent', () => {
  let component: UpdateproductadminComponent;
  let fixture: ComponentFixture<UpdateproductadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateproductadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateproductadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
