import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IFactura } from '../Interfaces/ifactura';
import { Router, RouterLink } from '@angular/router';
import { FacturaService } from '../Services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit {
  listafacturas: IFactura[] = [];
  constructor(private facturaServicio: FacturaService) {}
  ngOnInit(): void {
    this.cargaTabla();
  }

  cargaTabla(){
    this.facturaServicio.todos().subscribe(
      (data) => {
        
        this.listafacturas = data;
        console.log(this.listafacturas);
      }
    );
  }

  eliminar(idFactura:number){

    Swal.fire({
      title: "Facturas",
      text: "Está seguro que desea eliminar la factura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar Factura"
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaServicio.eliminar(idFactura).subscribe(
          (data) => {
            Swal.fire({
              title: "Eliminado",
              text: "La factura ha sido eliminada.",
              icon: "success"
            });
            this.cargaTabla();
          }
        );
      }
    });
  }
}
