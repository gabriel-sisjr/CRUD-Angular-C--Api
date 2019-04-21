import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../shared/pessoa.model';
import { PessoaService } from '../shared/pessoaService';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
})
export class PessoaListComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pessoaService.ObterTodos().subscribe(
      pessoas => this.pessoas = pessoas,
      error => alert('erro')
    );
  }

  DeletarPessoa(pessoa: Pessoa) {
    const deletar = confirm('Deseja deletar?');

    if (deletar) {
      this.pessoaService.Deletar(pessoa.id).subscribe(
      () => this.pessoas = this.pessoas.filter(element => element !== pessoa),
      () => alert('Erro ao excluir!')
    );
    }
  }
}
