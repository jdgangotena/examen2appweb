import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IIva } from 'src/app/Interfaces/iiva';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIva: IIva[] = [];
  titulo = '';
  frm_Producto: FormGroup;
  idProductos = 0;
  editar = false;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaServicio: IvaService,
    private productoServicio: ProductoService,
    private navegacion: Router,
    private ruta:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idProductos = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaIva = data));
    console.log(this.listaIva);
    this.crearFormulario();


    if(this.idProductos > 0){
        this.editar = true;
        this.productoServicio.uno(this.idProductos).subscribe((producto) => {
        this.frm_Producto.get('Codigo_Barras')?.setValue(producto.Codigo_Barras);
        this.frm_Producto.get('Nombre_Producto')?.setValue(producto.Nombre_Producto);
        this.frm_Producto.get('Graba_IVA')?.setValue(producto.Graba_IVA);
      });
    }
  }
  crearFormulario() {
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }
  grabar() {
    let producto: IProducto = {
      Codigo_Barras: this.frm_Producto.get('Codigo_Barras')?.value,
      Nombre_Producto: this.frm_Producto.get('Nombre_Producto')?.value,
      Graba_IVA: this.frm_Producto.get('Graba_IVA')?.value,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.get('Unidad_Medida_idUnidad_Medida')?.value,
      IVA_idIVA: this.frm_Producto.get('IVA_idIVA')?.value,
      Cantidad: this.frm_Producto.get('Cantidad')?.value,
      Valor_Compra: this.frm_Producto.get('Valor_Compra')?.value,
      Valor_Venta: this.frm_Producto.get('Valor_Venta')?.value,
      Proveedores_idProveedores: this.frm_Producto.get('Proveedores_idProveedores')?.value,
    };
    if (this.idProductos == 0 || isNaN(this.idProductos)) {
      this.productoServicio.insertar(producto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Producto grabado');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al grabar');
        }
      });
    }else {
      producto.idProductos = this.idProductos;
      this.productoServicio.actualizar(producto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          this.idProductos = 0;
          alert('Actualizado con exito');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
    }
  }
