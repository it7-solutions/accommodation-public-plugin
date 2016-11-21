import {Injectable} from "@angular/core";
import {vsprintf} from "sprintf-js";

@Injectable()
export class TranslationsService {
    private codes: any = {};
    private translationsByCode: any = {};
    private onTranslate: any;

    public setTranslations(translations: any[]){
        if(Array.isArray(translations)){
            this.codes = {};
            this.translationsByCode = TranslationsService.indexTranslations(translations);
            window['t'] = this.codes;
        }
    }

    public setEchoCallback(callback: any){
        this.onTranslate = callback;
    }

    public translate(text: string, parameters: string[]): string {
        return this.getTranslation(this.buildCode(text), text, parameters);
    }

    private buildCode(text:string):string{
        var code = text.toLowerCase().replace(/([^a-z0-9])/g, '_');
        this.codes[code] = this.codes[code] ? this.codes[code]++ : 1;
        return code;
    }

    private getTranslation(code:string, fallback: string, parameters: string[]):string{
        var translation: any;
        // If exist custom translate function - call
        if(typeof this.onTranslate === 'function'){
            translation = this.onTranslate(code, fallback);
        }
        // If not translated - get translation from passed translations
        if(typeof translation != 'string'){
            translation = this.translationsByCode[code];
        }
        // If not fount translations - use fallback
        translation === undefined && (translation = fallback);

        // If pass parameters - render with sprintf
        parameters && (translation = vsprintf(translation, parameters));

        return translation;
    }

    private static indexTranslations(translations: any[]):any{
        var indexed = {};
        for(var t in translations){
            indexed[translations[t].code] = translations[t].value;
        }
        return indexed;
    }
}
