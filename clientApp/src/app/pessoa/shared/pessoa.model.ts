import { BaseResourceModel } from 'src/app/shared/models/BaseResource.model';

export class Pessoa extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public sobrenome?: string
    ) {
        super();
    }
}
