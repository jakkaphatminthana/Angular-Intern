import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdistrictListComponent } from './subdistrict-list.component';

describe('SubdistrictListComponent', () => {
  let component: SubdistrictListComponent;
  let fixture: ComponentFixture<SubdistrictListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdistrictListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdistrictListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
