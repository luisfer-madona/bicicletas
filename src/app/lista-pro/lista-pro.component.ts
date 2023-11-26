import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../shared/Producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pro',
  templateUrl: './lista-pro.component.html',
  styleUrls: ['./lista-pro.component.css']
})
export class ListaProComponent implements OnInit {
  ListaProductos: Producto[] = [];

  constructor(public productoService: ProductoService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  // Cargar lista de productos
  cargarProductos() {
    return this.productoService.GetProductos().subscribe((data: any) => {
      this.ListaProductos = data;
    });
  }

  // Eliminar un producto
  eliminarProducto(data: Producto) {

    Swal.fire({
      title: 'Eliminar el producto?',
      text: 'Este proceso es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo.',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.value) {
        var index: number = index = this.ListaProductos.map((x: { id: number; }) => { return x.id }).indexOf(data.id);
        this.productoService.DeleteProducto(data.id).subscribe(res => {
          this.ListaProductos.splice(index, 1)
          console.log('Producto eliminado!')
        });
        Swal.fire('Eliminado!', 'El producto se eliminó con éxito.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}
