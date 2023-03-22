import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustSearchComponent } from './adjust-search.component';

describe('AdjustSearchComponent', () => {
  let component: AdjustSearchComponent;
  let fixture: ComponentFixture<AdjustSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
