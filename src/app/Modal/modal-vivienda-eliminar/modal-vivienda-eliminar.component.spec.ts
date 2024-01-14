import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViviendaEliminarComponent } from './modal-vivienda-eliminar.component';

describe('ModalViviendaEliminarComponent', () => {
  let component: ModalViviendaEliminarComponent;
  let fixture: ComponentFixture<ModalViviendaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViviendaEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViviendaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
