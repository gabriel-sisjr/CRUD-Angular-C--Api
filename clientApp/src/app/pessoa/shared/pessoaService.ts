import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/BaseResource.service';
import { Pessoa } from './pessoa.model';
import { API_ADRESS_USER } from 'src/app/app.apiPath';

@Injectable()
export class PessoaService extends BaseResourceService<Pessoa> {
    constructor(protected injetor: Injector) {
        super(API_ADRESS_USER, injetor);
    }
}
