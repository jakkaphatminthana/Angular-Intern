import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QoComponent } from './qo.component';

describe('QoComponent', () => {
  let component: QoComponent;
  let fixture: ComponentFixture<QoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
