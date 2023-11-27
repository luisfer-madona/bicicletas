import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../shared/Producto';
import { ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-pro',
  templateUrl: './registrar-pro.component.html',
  styleUrls: ['./registrar-pro.component.css']
})
export class RegistrarProComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  producto?: Producto;
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
    private productoService: ProductoService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      modelo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      sku: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
      material: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      cantidad: [0, [Validators.required, Validators.min(0), Validators.max(100000)]]
    });

    this.registerForm.controls['id'].disable();

    this.sub = this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.productoService.GetProducto(id).subscribe((data: any) => {
        this.producto = data;

        if (this.producto) {

          this.registerForm.setValue({
            id: this.producto.id,
            nombre: this.producto.nombre,
            marca: this.producto.marca,
            modelo: this.producto.modelo,
            color: this.producto.color,
            descripcion: this.producto.descripcion,
            sku: this.producto.sku,
            material: this.producto.material,
            cantidad: this.producto.cantidad
          });
        } else {
          // Para pruebas rápidas solamente
          /*this.registerForm.setValue({
            id: 0,
            nombre: 'Llanta para bicicleta',
            marca: 'Marca de llanta',
            modelo: 'Modelo de llanta',
            color: 'Negro',
            descripcion: 'LLanta para bicicleta de marca genérica',
            sku: 'LLANT-GEN-NEG-12',
            material: 'Material',
            cantidad: 10
          });*/
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.producto) { // Actualizar producto
      this.registerForm.controls["id"].enable();
      this.productoService.UpdateProducto(this.registerForm.value).subscribe((res) => {
        console.log('Producto modificado!');
        Swal.fire('Actualización', 'El producto ha sido modificado!', 'success');
        this.ngZone.run(() => this.router.navigateByUrl('/productos'));
      });
    } else { // Crear producto
      this.productoService.CreateProducto(this.registerForm.value).subscribe((res) => {
        console.log('Producto añadido!');
        Swal.fire('Creación', 'El producto ha sido creado!', 'success');
        this.ngZone.run(() => this.router.navigateByUrl('/productos'));
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
