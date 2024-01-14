import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViviendaComponent } from './modal-vivienda.component';

describe('ModalViviendaComponent', () => {
  let component: ModalViviendaComponent;
  let fixture: ComponentFixture<ModalViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViviendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
