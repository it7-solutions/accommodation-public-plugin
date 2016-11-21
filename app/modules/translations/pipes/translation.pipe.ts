import { Pipe, PipeTransform } from '@angular/core';

import { TranslationsService } from '../services/translations.service';

@Pipe({
    name: 'translation'
})
export class TranslationPipe implements PipeTransform {

    constructor(public service:TranslationsService) {
    }

    transform(text: string, ...parameters: string[]): string {
        return this.service.translate(text, parameters);
    }
}