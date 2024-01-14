import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioActualizarComponent } from './modal-usuario-actualizar.component';

describe('ModalUsuarioActualizarComponent', () => {
  let component: ModalUsuarioActualizarComponent;
  let fixture: ComponentFixture<ModalUsuarioActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUsuarioActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUsuarioActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
