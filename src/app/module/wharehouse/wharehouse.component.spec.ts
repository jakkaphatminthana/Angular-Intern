import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharehouseComponent } from './wharehouse.component';

describe('WharehouseComponent', () => {
  let component: WharehouseComponent;
  let fixture: ComponentFixture<WharehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WharehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
