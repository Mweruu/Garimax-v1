import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuptabsComponent } from './signuptabs.component';

describe('SignuptabsComponent', () => {
  let component: SignuptabsComponent;
  let fixture: ComponentFixture<SignuptabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuptabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignuptabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
