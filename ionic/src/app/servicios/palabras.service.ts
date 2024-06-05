import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Palabras } from '../interfaces/palabras';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  //Direccion del servidor de laravel
  //Se usa para enviar solicitudes http
  private readonly apiGOD_URL = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  //Funcion que permite obtener las palabras almacenadas en la base de datos
  getPalabras(): Observable<Palabras[]>{
    return this.http.get<Palabras[]>(`${this.apiGOD_URL}/Palabras`);
  }
}
