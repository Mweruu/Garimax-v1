import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualloginComponent } from './individuallogin.component';

describe('IndividualloginComponent', () => {
  let component: IndividualloginComponent;
  let fixture: ComponentFixture<IndividualloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
