import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topusers } from '../interfaces/topusers';

@Injectable({
  providedIn: 'root'
})
export class TopuserService{
  //Direccion del servidor de laravel
  //Se usa para enviar solicitudes http
  private readonly apiGOD_URL = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  //Funcion que permite obtener los usuarios
  getTopusers(): Observable<Topusers[]>{
    return this.http.get<Topusers[]>(`${this.apiGOD_URL}/Topusers`);
  }
  //Funcion que permite crear un usuario
  createTopuser(data: Topusers): Observable<Topusers>{
    return this.http.post<Topusers>(`${this.apiGOD_URL}/Topusers`, data);
  }
  //Funcion que permite modificar la informacion de un usuario
  //No era necesaria
  updateTopuser(id: string, data: Topusers): Observable<Topusers>{
    return this.http.put<Topusers>(`${this.apiGOD_URL}/Topusers/${id}`, data);
  }
  //Funcion que permite eliminar un usuario
  //No era necesaria
  deleteTopuser(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiGOD_URL}/Topusers/${id}`);
  }
}
