import { NgModule } from '@angular/core';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PessoaListComponent, PessoaFormComponent],
  imports: [
    SharedModule,
    PessoaRoutingModule
  ]
})
export class PessoaModule { }
