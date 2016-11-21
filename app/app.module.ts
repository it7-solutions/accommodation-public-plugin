import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {TranslationsModule} from './modules/translations/translations.module';
import {PluginComponent}  from './components/plugin.component';
import {It7ErrorService} from "./services/it7-error.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslationsModule
    ],
    declarations: [
        PluginComponent
    ],
    bootstrap: [PluginComponent],
    providers: [
        It7ErrorService
    ]
})
export class AppModule {
}
