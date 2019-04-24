import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from '../shared/pessoa.model';
import { PessoaService } from '../shared/pessoaService';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html'
})
export class PessoaFormComponent implements OnInit, AfterContentChecked {

  // Variaveis
  actionAtual: string;
  pessoaForm: FormGroup;
  tituloPagina: string;
  msgErroServidor: string[] = null;
  formEnviado = false;
  pessoa: Pessoa;


  constructor(
    private pessoaService: PessoaService,
    private rotaAtiva: ActivatedRoute,
    private roteador: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.SetActionAtual();
    this.BuildPessoaForm();
    this.CarregarPessoa();
  }

  ngAfterContentChecked() {
    this.SetTituloPagina();
  }

  submitForm() {
    this.formEnviado = true;

    if (this.actionAtual === 'new') {
      this.CriarPessoa();
    } else if (this.actionAtual === 'edit') {
      this.AtualizarPessoa();
    }
  }

  // Metodos acessores
  private SetActionAtual() {
    if (this.rotaAtiva.snapshot.url[0].path === 'new') {
      this.actionAtual = 'new';
    } else {
      this.actionAtual = 'edit';
    }
   // this.actionAtual = this.rotaAtiva.snapshot.url[0].path;

    console.log(this.actionAtual);
  }

  private BuildPessoaForm() {
    this.pessoaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  private CarregarPessoa() {
    if (this.actionAtual === 'edit') {
      this.rotaAtiva.paramMap
      .pipe(
        switchMap(params => this.pessoaService.ObterPorId(+params.get('id'))))
      .subscribe(
        (p) => {
          this.pessoa = p;
          this.pessoaForm.patchValue(p); // Passando os valores para o formulario, casa seja edição.
        },
        (error) => alert('erro!')
      );
    }
  }

  private SetTituloPagina() {
    if (this.actionAtual === 'new') {
      this.tituloPagina = 'Cadastro pessoa';
    } else {
      const nomePessoa = this.pessoa.nome || '';
      this.tituloPagina = 'Editando pessoa: ' + nomePessoa;
    }
  }

  private CriarPessoa() {
    // No assign ele cria o objeto e atribui os valores do form ao objeto.
    this.pessoa = Object.assign(new Pessoa(), this.pessoaForm.value);

    this.pessoaService.Inserir(this.pessoa).
    subscribe(
      p => this.ActionForSuccess(p),
      error => this.ActionForError(error)
    );
  }

  private AtualizarPessoa() {
    this.pessoa = Object.assign(new Pessoa(), this.pessoaForm.value);

    this.pessoaService.Atualizar(this.pessoa).
    subscribe(
      p => this.ActionForSuccess(p),
      error => this.ActionForError(error)
    );
  }

  private ActionForSuccess(p: Pessoa) {
    toastr.success('Solicitação atendida com sucesso!!');

    /*
    // redireciona para pessoas, depois pra :id/edit.
    // o skiplocation faz com que o navegador nao rastreie o redirecionamento. (n aparece no historico)
    this.roteador.navigateByUrl('pessoas', {skipLocationChange: true}).then(
      () => this.roteador.navigate(['pessoas', p.id, 'edit'])
    );
    */
    this.roteador.navigate(['pessoas']);
  }

  private ActionForError(error) {
    toastr.error('Erro ao inserir a pessoa!');

    this.formEnviado = false;

    // Quando o recurso nao é processado com sucesso, retorna esse erro.
    if (error.status === 422) {
      // Retorna o corpo do erro para a variavel de checagem de erros.
      this.msgErroServidor = JSON.parse(error._body).errors;
    } else {
      this.msgErroServidor = ['Falha ao comunicar com a API'];
    }
  }
}
