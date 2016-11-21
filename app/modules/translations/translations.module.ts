import {NgModule}      from '@angular/core';

import {PluginConfig}  from '../../services/plugin.config';
import {TranslationsService} from './services/translations.service';
import {TranslationPipe} from './pipes/translation.pipe';

@NgModule({
    // imports: [BrowserModule],
    //bootstrap: [ChooseCantonComponent]
    providers: [TranslationsService],
    declarations: [TranslationPipe],
    exports: [TranslationPipe]
})
export class TranslationsModule {

    constructor(
        ts: TranslationsService,
        config: PluginConfig
    ) {
        ts.setTranslations(config.translations);
        ts.setEchoCallback((config as any).onTranslate);
    }
}
