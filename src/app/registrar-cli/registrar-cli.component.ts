import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../shared/Cliente';
import { ClienteService } from '../servicios/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cli',
  templateUrl: './registrar-cli.component.html',
  styleUrls: ['./registrar-cli.component.css']
})
export class RegistrarCliComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  cliente?: Cliente;
  sub: any;

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
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

    this.registerForm.controls['id'].disable();

    this.sub = this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.clienteService.obtenerClientePorId(id).subscribe((data: any) => {
        this.cliente = data;

        if (this.cliente) {
          this.registerForm.setValue({
            id: this.cliente.id,
            nombre: this.cliente.nombre,
            apellidoPaterno: this.cliente.apellidoPaterno,
            apellidoMaterno: this.cliente.apellidoMaterno,
            calle: this.cliente.calle,
            numeroExterior: this.cliente.numeroExterior,
            numeroInterior: this.cliente.numeroInterior,
            colonia: this.cliente.colonia,
            codigoPostal: this.cliente.codigoPostal,
            municipio: this.cliente.municipio,
            estado: this.cliente.estado,
            rfc: this.cliente.rfc,
            correo: this.cliente.correo,
            telefono: this.cliente.telefono
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // Método para verificar si el botón de registrar debe estar activo
  botonRegistrarHabilitado(): boolean {
    return this.registerForm.valid;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.cliente) {
      // Actualizar cliente
      this.registerForm.controls['id'].enable();
      this.clienteService.actualizarCliente(this.registerForm.value).subscribe(
        (res) => {
          console.log('Cliente modificado!');
          Swal.fire('Actualización', 'El cliente ha sido modificado!', 'success');
          this.ngZone.run(() => this.router.navigateByUrl('/clientes'));
        },
        (error) => {
          console.error('Error al modificar cliente:', error);
        }
      );
    } else {
      // Crear cliente
      this.clienteService.agregarCliente(this.registerForm.value).subscribe(
        (res) => {
          console.log('Cliente añadido!');
          Swal.fire('Creación', 'El cliente ha sido creado!', 'success');
          this.ngZone.run(() => this.router.navigateByUrl('/clientes'));
        },
        (error) => {
          console.error('Error al crear cliente:', error);
        }
      );
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
