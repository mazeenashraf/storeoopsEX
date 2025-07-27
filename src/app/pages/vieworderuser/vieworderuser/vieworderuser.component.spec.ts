import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworderuserComponent } from './vieworderuser.component';

describe('VieworderuserComponent', () => {
  let component: VieworderuserComponent;
  let fixture: ComponentFixture<VieworderuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VieworderuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VieworderuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
