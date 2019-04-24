import { BaseResourceModel } from '../models/BaseResource.model';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(protected apiPath: string, protected injetor: Injector) {
        this.http = injetor.get(HttpClient);
    }

    // Metodos acessores da API
    ObterTodos(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.ObjetosToJson)
        );
    }

    ObterPorId(id: number): Observable<T> {
        return this.http.get(`${this.apiPath}/${id}`).pipe(
            catchError(this.handleError),
            map(this.ObjetoToJson)
        );
    }

    Inserir(objeto: T): Observable<T> {
        return this.http.post(this.apiPath, objeto).pipe(
            catchError(this.handleError),
            map(this.ObjetoToJson)
        );
    }

    Atualizar(objeto: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${objeto.id}`, objeto).pipe(
            catchError(this.handleError),
            map(() => objeto)
        );
    }

    Deletar(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
            catchError(this.handleError),
            map(() => Boolean)
        );
    }


    // Metodos auxiliares
    protected handleError(error: any): Observable<any> {
        console.log('Erro na requisição ', error);
        return throwError(error);
    }

    protected ObjetosToJson(jsonData: any[]): T[] {
        const objetos: T[] = [];
        // tslint:disable-next-line: no-shadowed-variable
        jsonData.forEach(element => objetos.push(element as T));
        return objetos;
    }

    protected ObjetoToJson(jsonData: any): T {
        return jsonData as T;
    }
}
