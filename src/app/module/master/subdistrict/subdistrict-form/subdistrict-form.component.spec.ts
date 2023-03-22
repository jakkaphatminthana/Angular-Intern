import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdistrictFormComponent } from './subdistrict-form.component';

describe('SubdistrictFormComponent', () => {
  let component: SubdistrictFormComponent;
  let fixture: ComponentFixture<SubdistrictFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdistrictFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdistrictFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
