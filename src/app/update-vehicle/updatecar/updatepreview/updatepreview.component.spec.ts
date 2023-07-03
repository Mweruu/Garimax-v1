import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepreviewComponent } from './updatepreview.component';

describe('UpdatepreviewComponent', () => {
  let component: UpdatepreviewComponent;
  let fixture: ComponentFixture<UpdatepreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
