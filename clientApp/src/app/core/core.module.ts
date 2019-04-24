import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from '../pessoa/shared/pessoaService';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    // Modulos compartilhados
    BrowserModule,
    HttpClientModule
  ],
  providers: [PessoaService]
})
export class CoreModule { }
