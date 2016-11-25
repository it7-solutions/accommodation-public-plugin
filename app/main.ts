import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {PluginOptions, PluginConfig} from "./services/plugin.config";

export function RunApplication(options: PluginOptions) {
    let menuConfig = new PluginConfig(options);

    platformBrowserDynamic([{provide: PluginConfig, useValue: menuConfig }])
        .bootstrapModule(AppModule);
}
window['RunApplication'] = RunApplication;
