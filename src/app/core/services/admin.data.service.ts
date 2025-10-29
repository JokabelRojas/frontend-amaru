import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}categorias`);
  }

  getCategoriaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}categorias/${id}`);
  }
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}subcategorias`)
  }
  addCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}categorias`, categoria);
  }
  deleteCategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}categorias/${id}`);
  }
  updateCategoria(id: string, categoria: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}categorias/${id}`, categoria);
  }





}
