import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebasicinfoComponent } from './updatebasicinfo.component';

describe('UpdatebasicinfoComponent', () => {
  let component: UpdatebasicinfoComponent;
  let fixture: ComponentFixture<UpdatebasicinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebasicinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatebasicinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
