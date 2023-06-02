import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintabsComponent } from './logintabs.component';

describe('LogintabsComponent', () => {
  let component: LogintabsComponent;
  let fixture: ComponentFixture<LogintabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogintabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogintabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
