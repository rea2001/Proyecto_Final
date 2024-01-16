import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerImagenComponent } from './modal-ver-imagen.component';

describe('ModalVerImagenComponent', () => {
  let component: ModalVerImagenComponent;
  let fixture: ComponentFixture<ModalVerImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalVerImagenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVerImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
