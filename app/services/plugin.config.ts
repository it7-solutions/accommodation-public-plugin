import {Injectable} from "@angular/core";

export interface PluginOptions {
    name: string
    mockAJAX: any


    addToMyAgendaUrl: string
    removeFromMyAgendaUrl: string
}

@Injectable()
export class PluginConfig {
    name: string = '';
    mockAJAX: any;


    addToMyAgendaUrl: string = '';
    removeFromMyAgendaUrl: string = '';

    translations: any[] = [];
    onTranslate: any;

    constructor(options: PluginOptions) {
        Object.assign(this, options);
    }

    static buildTemplateUrl(path: string) {
        var base = (window && window['__it7_session_public_plugin__']) ? window['__it7_session_public_plugin__'] : 'app';
        return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
    }
}
