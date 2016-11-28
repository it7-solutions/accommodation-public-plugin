import {Injectable} from "@angular/core";

import {Room} from '../models/room';
import {Hotel} from '../models/hotel';
import {Day} from '../models/day';

export interface PluginOptions {
    name: string
    mockAJAX: any

    formId: string
    formAction: string

    hotel_id: string
    room_type_id: string
    date_input: string
    date_output: string
    sharing_room_with: string

    hotels: Hotel[]
    rooms: Room[]
    days: Day[]

    onChange?: () => {}

    onInit?: (callback: any) => any

}

@Injectable()
export class PluginConfig {
    name: string = '';
    mockAJAX: any;

    formId: string = '';
    formAction: string = '';

    hotel_id: string = '';
    room_type_id: string = '';
    date_input: string = '';
    date_output: string = '';
    sharing_room_with: string = '';

    hotels: Hotel[] = [];
    rooms: Room[] = [];
    days: Day[] = [];

    translations: any[] = [];
    onTranslate: any;

    onChange: () => {};

    onInit: (callback: any) => any

    constructor(options: PluginOptions) {
        Object.assign(this, options);
    }

    static buildTemplateUrl(path: string) {
        var base = (window && window['__it7_accommodation_public_plugin__']) ? window['__it7_accommodation_public_plugin__'] : 'app';
        return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
    }
}
