import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpictureupdateComponent } from './uploadpictureupdate.component';

describe('UploadpictureComponent', () => {
  let component: UploadpictureupdateComponent;
  let fixture: ComponentFixture<UploadpictureupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadpictureupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadpictureupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
