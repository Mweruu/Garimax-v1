import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecardetailsComponent } from './updatecardetails.component';

describe('UpdatecardetailsComponent', () => {
  let component: UpdatecardetailsComponent;
  let fixture: ComponentFixture<UpdatecardetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecardetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecardetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
