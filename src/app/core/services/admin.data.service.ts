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
    getSubcategoriasPorCategoria(idCategoria: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}subcategorias/categoria/${idCategoria}`);
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
  addSubcategoria(subcategoria: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}subcategorias`, subcategoria);
  }
  updateSubcategoria(id: string, subcategoria: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}subcategorias/${id}`, subcategoria);
  }
  deleteSubcategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}subcategorias/${id}`);
  }

  
  addTaller(tallerData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}talleres`, tallerData);
  }
  updateTaller(idTaller: string, tallerData: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}talleres/${idTaller}`, tallerData);
  }

}
