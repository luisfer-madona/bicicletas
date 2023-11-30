import { Component, OnInit } from '@angular/core';
import { VentaService } from '../servicios/venta.service';
import { Venta } from '../shared/Venta';
import Swal from 'sweetalert2';
import { OrdenService } from '../servicios/orden.service';

declare var window: any;

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  ListaVentas: Venta[] = [];
  VentaSeleccionada?: Venta;

  modalDetalles: any;

  constructor(
    private ordenesService: OrdenService,
    private ventasService: VentaService
  ) { }

  ngOnInit() {
    this.cargarVentas();

    this.modalDetalles = new window.bootstrap.Modal( // Modales
      document.getElementById('detailsModal')
    );
  }

  abrirModalDetalles(data: Venta) {
    this.VentaSeleccionada = data;

    this.ordenesService.GetOrdenes(data.id).subscribe((data: any) => {
      this.VentaSeleccionada!.ordenes = data;
    });

    this.modalDetalles.show();
  }

  // Cargar lista de ventas
  cargarVentas() {
    return this.ventasService.GetVentas().subscribe((data: any) => {
      this.ListaVentas = data;
    });
  }

  // Eliminar una venta
  eliminarVenta(data: Venta) {
    Swal.fire({
      title: 'Eliminar la venta?',
      text: 'Este proceso es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínala.',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.value) {
        var index: number = index = this.ListaVentas.map((x: { id: number; }) => { return x.id }).indexOf(data.id);
        this.ventasService.DeleteVenta(data.id).subscribe(res => {
          this.ListaVentas.splice(index, 1)
          console.log('Venta eliminada!')
        });
        Swal.fire('Eliminada!', 'La venta se eliminó con éxito.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}