import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceSearchComponent } from './province-search.component';

describe('ProvinceSearchComponent', () => {
  let component: ProvinceSearchComponent;
  let fixture: ComponentFixture<ProvinceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
