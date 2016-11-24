import {Component, Output, Input} from '@angular/core';

import {PluginConfig} from "../services/plugin.config";
import {It7ErrorService} from "../services/it7-error.service";
import {Room} from '../models/room';
import {Hotel} from '../models/hotel';
import {Day} from '../models/day';
import {Stainer} from '../models/stainer';
import {Collection} from '../models/collection';

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    public hotels: Hotel[];
    public rooms: Room[];
    public checkIn: Day[];
    public checkOut: Day[];
    public allowShare: boolean;

    hotel_id: string = '';
    room_type_id: string = '';
    date_input: string = '';
    date_output: string = '';
    sharing_room_with: string = '';

    private stainer: Stainer;

    constructor(
        public config: PluginConfig,
        private err: It7ErrorService,
    ) {
        this.stainer = new Stainer(
            new Collection<Hotel>(config.hotels),
            new Collection<Room>(config.rooms),
            new Collection<Day>(config.days)
        );
        this.initInputData(config);
        this.updateLists();
    }

    public ngAfterViewChecked() {
        if('function' === typeof this.config.onChange) {
            this.config.onChange();
        }
    }

    public onHotelChange(id: string) {
        this.stainer.setHotel(id);
        this.updateLists();
    }

    public onRoomChange(id: string) {
        this.stainer.setRoom(id);
        this.updateLists();
    }

    public onCheckInChange(id: string) {
        this.stainer.setCheckInDay(id);
        this.updateLists();
    }

    public onCheckOutChange(id: string) {
        this.stainer.setCheckOutDay(id);
        this.updateLists();
    }

    private initInputData(config: PluginConfig){
        if (config.hotel_id) {
            this.hotel_id = config.hotel_id;
            this.stainer.setHotel(this.hotel_id);
        }
        if (config.room_type_id) {
            this.room_type_id = config.room_type_id;
            this.stainer.setRoom(this.room_type_id);
        }
        if (config.date_input) {
            this.date_input = config.date_input;
            this.stainer.setCheckInDay(this.date_input);
        }
        if (config.date_output) {
            this.date_output = config.date_output;
            this.stainer.setCheckOutDay(this.date_output);
        }
        this.sharing_room_with = config.sharing_room_with;
    }

    private updateLists() {
        this.allowShare = this.stainer.room ? this.stainer.room.allow_share : false;

        this.hotels = this.stainer.getHotel();
        this.rooms = this.stainer.getRooms();
        this.checkIn = this.stainer.getCheckInDays();
        this.checkOut = this.stainer.getCheckOutDays();
    }

}
