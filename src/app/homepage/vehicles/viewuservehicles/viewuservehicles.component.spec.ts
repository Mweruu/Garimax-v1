import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuservehiclesComponent } from './viewuservehicles.component';

describe('ViewuservehiclesComponent', () => {
  let component: ViewuservehiclesComponent;
  let fixture: ComponentFixture<ViewuservehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewuservehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewuservehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
