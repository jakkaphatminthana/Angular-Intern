import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDistrictFormComponent } from './sub-district-form.component';

describe('SubDistrictFormComponent', () => {
  let component: SubDistrictFormComponent;
  let fixture: ComponentFixture<SubDistrictFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDistrictFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDistrictFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
