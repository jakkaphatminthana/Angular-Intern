import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustFormComponent } from './adjust-form.component';

describe('AdjustFormComponent', () => {
  let component: AdjustFormComponent;
  let fixture: ComponentFixture<AdjustFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
