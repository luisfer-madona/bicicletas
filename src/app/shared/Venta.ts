import { Orden } from "./Orden";

export class Venta {
    id!: number;
    fecha!: Date;
    id_cliente!: number;
    subtotal!: number;
    descuento!: number;
    total!: number;

    ordenes!: Orden[];
    cliente!: string;
}