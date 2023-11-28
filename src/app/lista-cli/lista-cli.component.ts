import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/clientes.service';
import { Cliente } from '../shared/Cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-cli',
  templateUrl: './lista-cli.component.html',
  styleUrls: ['./lista-cli.component.css']
})
export class ListaCliComponent implements OnInit {
  ListaClientes: Cliente[] = [];

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  // Cargar lista de clientes
  cargarClientes() {
    return this.clienteService.obtenerClientes().subscribe((data: any) => {
      this.ListaClientes = data.map((cliente: Cliente) => {
        // Manejar el caso donde cliente.id es undefined
        return { ...cliente, id: cliente.id || 0 }; // Puedes elegir otro valor por defecto que no afecte tu lógica.
      });
    });
  }

  // Eliminar un cliente
  eliminarCliente(data: Cliente) {
    if (data.id !== undefined) {
      Swal.fire({
        title: 'Eliminar el cliente?',
        text: 'Este proceso es irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínalo.',
        cancelButtonText: 'No, cancela',
      }).then((result) => {
        if (result.value) {
          this.clienteService.eliminarCliente(data.id).subscribe(res => {
            this.cargarClientes(); // Recargar la lista después de eliminar
            console.log('Cliente eliminado!');
          });
          Swal.fire('Eliminado!', 'El cliente se eliminó con éxito.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          //Swal.fire('Cancelled', 'Client still in our database.', 'error');
        }
      });
    } else {
      console.error('El ID del cliente es undefined.');
    }
  }
}
