import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicar-departamentos',
  templateUrl: './publicar-departamentos.component.html',
  styleUrl: './publicar-departamentos.component.css'
})
export class PublicarDepartamentosComponent {
  publicarForm: FormGroup;
  caracteristicasForm: FormGroup;
  serviciosForm: FormGroup;
  condicionesForm: FormGroup;



  constructor(private fb: FormBuilder) {
    this.caracteristicasForm = this.fb.group({
      habitaciones: ['', Validators.required],
      banios: ['', Validators.required],
      // ... otras características según tus necesidades
    })
    
    this.publicarForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      tipoPropiedad: ['', Validators.required],
      latitud: ['',Validators.required],
      longitud: ['',Validators.required],
      estado: ['', Validators.required],
    // ... otros campos según tus necesidades
    })
    this.serviciosForm = this.fb.group({
      luz: [false],
      internet: [false],
      duchaElectrica: [false],
      calefon: [false],
      garage: [false]
      // ... otros servicios según tus necesidades
    })

    this.condicionesForm = this.fb.group({
      permiteAnimales: [false],
      permiteFumar: [false],
      numPersonas: ['', Validators.required]
      // ... otras condiciones según tus necesidades
    })
  }
    
  onSubmit() {
    // Lógica para enviar datos al servicio
    console.log('Datos del formulario de publicación:', this.publicarForm.value);
  }

  selectedImages: string[] = [];

  onFileChange(event: any) {
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Asegúrate de no exceder el límite de 5 imágenes
          if (this.selectedImages.length < 5) {
            this.selectedImages.push(e.target.result);
          }else{
            alert("Límite de 5 imágenes");
          }
        
        };

        reader.readAsDataURL(files[i]);
      }
    }
  }
}
