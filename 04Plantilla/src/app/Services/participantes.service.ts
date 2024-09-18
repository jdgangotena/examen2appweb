import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IParticipantes } from '../Interfaces/iparticipantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  apiurl = 'http://localhost/examen2appweb/03MVC/controllers/participantes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  // Buscar un participante por nombre o criterio similar
  buscar(texto: string): Observable<IParticipantes> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IParticipantes>(this.apiurl + 'uno', formData);
  }

  // Obtener todos los participantes
  todos(): Observable<IParticipantes[]> {
    return this.lector.get<IParticipantes[]>(this.apiurl + 'todos');
  }

  // Obtener un participante por su ID
  uno(participante_id: number): Observable<IParticipantes> {
    const formData = new FormData();
    formData.append('participante_id', participante_id.toString());
    return this.lector.post<IParticipantes>(this.apiurl + 'uno', formData);
  }

  // Eliminar un participante por su ID
  eliminar(participante_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('participante_id', participante_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar un nuevo participante
  insertar(participante: IParticipantes): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', participante.nombre);
    formData.append('apellido', participante.apellido);
    formData.append('email', participante.email);
    formData.append('telefono', participante.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar los datos de un participante
  actualizar(participante: IParticipantes): Observable<string> {
    const formData = new FormData();
    formData.append('participante_id', participante.participante_id?.toString() || '');
    formData.append('nombre', participante.nombre);
    formData.append('apellido', participante.apellido);
    formData.append('email', participante.email);
    formData.append('telefono', participante.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
