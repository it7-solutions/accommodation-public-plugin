import {Collection} from './collection';
import {Day} from './day';
import {Room} from './room';
import {Hotel} from './hotel';
/**
 * Created by Buzzer on 21.11.2016.
 */

export class Stainer {
    hotels: Collection<Hotel>;
    rooms: Collection<Room>;
    days: Collection<Day>;

    room: Room;

    // constructor(hotels: Hotel[], rooms: Room[], days: Day[]) {
    //     this.hotels = new Collection<Hotel>(hotels);
    //     this.rooms = new Collection<Room>(rooms);
    //     this.days = new Collection<Day>(days);
    // }
    constructor(hotels: Collection<Hotel>, rooms: Collection<Room>, days: Collection<Day>) {
        this.hotels = hotels;
        this.rooms = rooms;
        this.days = days;
    }

    public setRoom(id: string) {
        this.room = this.rooms.get(id);
    }

    public getDays(): Day[] {
        return this.room ? this.getDaysForRoom(this.room) : this.days.items;
    }

    private getDaysForRoom(room: Room): Day[] {
        let days: Day[] = [];
        // Loop for each day_id in each periods
        // get Day by id and push to array
        room.periods.forEach(p => p.forEach(id => days.push(this.days.get(id))));
        return days;
    }
}