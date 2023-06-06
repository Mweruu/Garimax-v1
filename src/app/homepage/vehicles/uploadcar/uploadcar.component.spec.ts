import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcarComponent } from './uploadcar.component';

describe('UploadcarComponent', () => {
  let component: UploadcarComponent;
  let fixture: ComponentFixture<UploadcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
