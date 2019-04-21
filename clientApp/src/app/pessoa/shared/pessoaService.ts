import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pessoa } from './pessoa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ADRESS } from 'src/app/app.apiPath';

@Injectable()
export class PessoaService {
    constructor(private http: HttpClient) {}
    // Metodos acessores da API
    ObterTodos(): Observable<Pessoa[]> {
        return this.http.get(API_ADRESS).pipe(
            catchError(this.handleError),
            map(this.pessoasToJson)
        );
    }

    ObterPorId(id: number): Observable<Pessoa> {
        return this.http.get(`${API_ADRESS}/${id}`).pipe(
            catchError(this.handleError),
            map(this.pessoaToJson)
        );
    }

    Inserir(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post(API_ADRESS, pessoa).pipe(
            catchError(this.handleError),
            map(this.pessoaToJson)
        );
    }

    Atualizar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put(`${API_ADRESS}/${pessoa.id}`, pessoa).pipe(
            catchError(this.handleError),
            map(() => pessoa)
        );
    }

    Deletar(id: number): Observable<any> {
        return this.http.delete(`${API_ADRESS}/${id}`).pipe(
            catchError(this.handleError),
            map(() => Boolean)
        );
    }


    // Metodos auxiliares
    private handleError(error: any): Observable<any> {
        console.log('Erro na requisição ', error);
        return throwError(error);
    }

    private pessoasToJson(jsonData: any[]): Pessoa[] {
        const pessoas: Pessoa[] = [];
        // tslint:disable-next-line: no-shadowed-variable
        jsonData.forEach(element => pessoas.push(element as Pessoa));
        return pessoas;
    }

    private pessoaToJson(jsonData: any): Pessoa {
        return jsonData as Pessoa;
    }
}
