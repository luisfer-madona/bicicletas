import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-cli',
  templateUrl: './registrar-cli.component.html',
  styleUrls: ['./registrar-cli.component.css']
})
export class RegistrarCliComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Define tu formulario con las validaciones necesarias
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      colonia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      rfc: [''],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
    this.formulario.valueChanges.subscribe((value) => {
      /* console.log('Estado del formulario:', value);
      console.log('Campos válidos:', this.obtenerCamposValidos()); */
    });
  }

  // ...

  obtenerCamposValidos(): string[] {
    const camposValidos = [];
    for (const controlName in this.formulario.controls) {
      if (this.formulario.controls[controlName].valid) {
        camposValidos.push(controlName);
      }
    }
    return camposValidos;
  }

  // Método para verificar si el botón de registrar debe estar activo
  botonRegistrarHabilitado(): boolean {
    return this.formulario.valid;
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    // Realiza las acciones necesarias al enviar el formulario
    console.log('Formulario enviado');
  }
}
