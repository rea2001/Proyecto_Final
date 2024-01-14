import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFotosComponent } from './modal-fotos.component';

describe('ModalFotosComponent', () => {
  let component: ModalFotosComponent;
  let fixture: ComponentFixture<ModalFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
