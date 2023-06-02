import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsignupComponent } from './individualsignup.component';

describe('IndividualsignupComponent', () => {
  let component: IndividualsignupComponent;
  let fixture: ComponentFixture<IndividualsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
