import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGetComponent } from './request-get.component';

describe('RequestGetComponent', () => {
  let component: RequestGetComponent;
  let fixture: ComponentFixture<RequestGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
