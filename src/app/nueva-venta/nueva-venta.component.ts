import { Component, NgZone, OnInit } from '@angular/core';
import { Producto } from '../shared/Producto';
import Swal from 'sweetalert2';
import { Cliente } from '../shared/Cliente';
import { ProductoService } from '../servicios/producto.service';
import { ClienteService } from '../servicios/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from '../shared/Venta';
import { VentaService } from '../servicios/venta.service';
import { Orden } from '../shared/Orden';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {

  ventaForm!: FormGroup; // Form
  submitted = false;

  modalClientes: any;
  modalProductos: any;

  ListaClientes: Cliente[] = [];
  ListaProductos: Producto[] = [];

  ListaProductosVenta: Producto[] = [];

  ClienteSeleccionado?: Cliente;
  subtotal: number = 0;
  descuento: number = 0;
  porcentajeDescuento: number = 0;
  total: number = 0;

  get f() { return this.ventaForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private ventaService: VentaService) { }

  ngOnInit() {
    this.ventaForm = this.formBuilder.group({
      fecha: [this.obtenerFecha(), Validators.required],
      cliente: ['', Validators.required],
    });

    this.modalClientes = new window.bootstrap.Modal( // Modales
      document.getElementById('customerModal')
    );
    this.modalProductos = new window.bootstrap.Modal(
      document.getElementById('productModal')
    );

    this.cargarClientes();
    this.cargarProductos();
  }

  // Obtener fecha actual
  obtenerFecha(): string {
    const fecha = new Date();

    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  // Cargar lista de clientes
  cargarClientes() {
    return this.clienteService.obtenerClientes().subscribe((data: any) => {
      this.ListaClientes = data;
    });
  }

  // Cargar lista de productos
  cargarProductos() {
    return this.productoService.GetProductos().subscribe((data: any) => {
      this.ListaProductos = data;
    });
  }

  // Modales
  abrirModalClientes() {
    this.modalClientes.show();
  }

  seleccionarCliente(data: Cliente) {
    this.modalClientes.hide();
    Swal.fire('Cliente seleccionado', 'Se ha seleccionado un cliente!', 'success')
      .then((result) => {
        this.ClienteSeleccionado = data;
        this.ventaForm.patchValue({
          cliente: data.nombre + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno
        });
      });
  }

  abrirModalProductos() {
    this.modalProductos.show();
  }

  seleccionarProducto(data: Producto) {
    this.modalProductos.hide();
    Swal.fire({
      title: 'Que cantidad va a añadir a la venta?',
      icon: 'question',
      input: 'range',
      inputLabel: 'El inventario puede cambiar al momento de finalizar la venta.',
      inputAttributes: {
        min: '1',
        max: data.cantidad.toString(),
        step: '1'
      },
      inputValue: 1
    }).then((result) => {
      let producto = JSON.parse(JSON.stringify(data));
      producto.cantidad = Number(result.value);

      const index = this.ListaProductosVenta.findIndex(o => o.id === producto.id);

      if (index !== -1) {
        this.ListaProductosVenta[index].cantidad += producto.cantidad;
        this.ListaProductosVenta[index].total = this.ListaProductosVenta[index].cantidad * this.ListaProductosVenta[index].precio;
      } else {
        producto.total = Number(producto.precio) * Number(producto.cantidad);
        this.ListaProductosVenta.push(producto);
      }

      this.subtotal = 0;
      this.ListaProductosVenta.forEach(i => {
        this.subtotal += i.total;
      });

      this.calcularDescuento();

    });
  }

  seleccionarDescuento() {
    Swal.fire({
      title: 'Que porcentaje de descuento se aplicará?',
      icon: 'question',
      input: 'range',
      inputLabel: '',
      inputAttributes: {
        min: '0',
        max: '100',
        step: '5'
      },
      inputValue: this.porcentajeDescuento
    }).then((result) => {
      this.porcentajeDescuento = Number(result.value);
      this.calcularDescuento();
    });
  }

  calcularDescuento() {
    this.descuento = this.subtotal * (this.porcentajeDescuento / 100);
    this.total = this.subtotal - this.descuento;
  }

  // Eliminar un producto
  eliminarProducto(data: Producto) {
    Swal.fire({
      title: 'Eliminar el producto?',
      text: 'El proceso se eliminara de la lista de venta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo.',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.value) {
        var index: number = index = this.ListaProductosVenta.map((x: { id: number; }) => { return x.id }).indexOf(data.id);
        this.ListaProductosVenta.splice(index, 1);
        /*this.productoService.DeleteProducto(data.id).subscribe(res => {
          this.ListaProductos.splice(index, 1)
          console.log('Producto eliminado!')
        });*/
        Swal.fire('Eliminado', 'El producto se eliminó de la lista con éxito!', 'success');
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ventaForm.invalid) {
      return;
    }

    if (this.ListaProductosVenta.length == 0)
      Swal.fire('Verificar', 'La lista de ordenes esta vacía!', 'info');
    else {
      Swal.fire({
        title: "Añadir pago",
        input: "text",
        inputLabel: `Ingrese el monto de pago (${this.total * 0.1} - ${this.total})`,
        inputValue: (this.total * 0.1).toString(),
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "El pago no puede quedar vacío.";

          let t = Number(value);
          if (t < this.total * 0.1 || t > this.total) return "El monto ingresado es invalido. Verifique.";
          return null;
        }
      }).then((result) => {
        // Guardar venta aqui
        let venta = new Venta();

        let date = new Date();
        venta.fecha = new Date(this.f['fecha'].value);
        venta.fecha.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        venta.id_cliente = this.ClienteSeleccionado?.id ?? -1;
        venta.subtotal = this.subtotal;
        venta.descuento = this.porcentajeDescuento;
        venta.total = this.total;

        let ordenes: Orden[] = [];  // Lista de ordenes
        this.ListaProductosVenta.forEach(i => {
          let orden = new Orden();
          orden.id_producto = i.id;
          orden.precio = i.precio;
          orden.cantidad = i.cantidad;

          ordenes.push(orden);
        });
        venta.ordenes = JSON.parse(JSON.stringify(ordenes));

        this.ventaService.CreateVenta(venta).subscribe((res) => {
          console.log('Venta añadida!');
          Swal.fire('Creación', 'La venta se ha realizado!', 'success');
          this.ngZone.run(() => this.router.navigateByUrl('/ventas'));
        });
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.ventaForm.reset();
  }
}