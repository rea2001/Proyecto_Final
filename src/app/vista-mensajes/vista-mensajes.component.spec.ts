import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMensajesComponent } from './vista-mensajes.component';

describe('VistaMensajesComponent', () => {
  let component: VistaMensajesComponent;
  let fixture: ComponentFixture<VistaMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaMensajesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
