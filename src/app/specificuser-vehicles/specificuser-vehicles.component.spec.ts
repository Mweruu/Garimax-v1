import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificuserVehiclesComponent } from './specificuser-vehicles.component';

describe('SpecificuserVehiclesComponent', () => {
  let component: SpecificuserVehiclesComponent;
  let fixture: ComponentFixture<SpecificuserVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificuserVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificuserVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
