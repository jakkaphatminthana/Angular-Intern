import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDistrictSearchComponent } from './sub-district-search.component';

describe('SubDistrictSearchComponent', () => {
  let component: SubDistrictSearchComponent;
  let fixture: ComponentFixture<SubDistrictSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDistrictSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDistrictSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
