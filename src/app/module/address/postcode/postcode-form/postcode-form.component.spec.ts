import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcodeFormComponent } from './postcode-form.component';

describe('PostcodeFormComponent', () => {
  let component: PostcodeFormComponent;
  let fixture: ComponentFixture<PostcodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
