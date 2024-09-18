import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITalleres } from '../Interfaces/italleres';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TallerService {
  apiurl = 'http://localhost/examen2appweb/03MVC/controllers/talleres.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los talleres
  todos(): Observable<ITalleres[]> {
    return this.http.get<ITalleres[]>(this.apiurl + 'todos');
  }

  // Método para obtener un taller por su ID
  uno(taller_id: number): Observable<ITalleres> {
    const formData = new FormData();
    formData.append('taller_id', taller_id.toString());
    return this.http.post<ITalleres>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un taller por su ID
  eliminar(taller_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('taller_id', taller_id.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo taller
  insertar(taller: ITalleres): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', taller.nombre);
    formData.append('descripcion', taller.descripcion);
    formData.append('fecha', taller.fecha.toString());
    formData.append('ubicacion', taller.ubicacion);
    
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un taller
  actualizar(taller: ITalleres): Observable<string> {
    const formData = new FormData();
    formData.append('taller_id', taller.taller_id?.toString() || '');
    formData.append('nombre', taller.nombre);
    formData.append('descripcion', taller.descripcion);
    formData.append('fecha', taller.fecha.toString());
    formData.append('ubicacion', taller.ubicacion);
    
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
