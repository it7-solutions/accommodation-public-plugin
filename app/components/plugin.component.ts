import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {It7ErrorService} from "../services/it7-error.service";

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {

    private showChooseCanton = false;

    constructor(
        config: PluginConfig,
        private err: It7ErrorService,
    ) {
    }


}
