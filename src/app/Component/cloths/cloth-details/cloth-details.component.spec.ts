import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothDetailsComponent } from './cloth-details.component';

describe('ClothDetailsComponent', () => {
  let component: ClothDetailsComponent;
  let fixture: ComponentFixture<ClothDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
