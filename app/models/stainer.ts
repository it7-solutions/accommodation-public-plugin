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
    hotel: Hotel;
    checkIn: Day;
    checkOut: Day;

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

    public setHotel(id: string) {
        this.hotel = this.hotels.get(id);
        this.room = undefined;
    }

    public setRoom(id: string) {
        this.room = this.rooms.get(id);
    }

    public setCheckInDay(id: string) {
        this.checkIn = this.days.get(id);
    }

    public setCheckOutDay(id: string) {
        this.checkOut = this.days.get(id);
    }

    public getHotel(): Hotel[] {
        return this.hotels.items;
    }

    public getRooms(): Room[] {
        let rooms: Room[] = this.hotel ? this.rooms.items.filter(r => r.hotel_id === this.hotel.id) : [];
        return this.filterRoomsGivenCheckIn(rooms);
    }

    public getCheckInDays(): Day[] {
        return this.room ? this.getDaysForRoom(this.room) : this.getAllRoomsDays();
    }

    public getCheckOutDays(): Day[] {
        let days: Day[] = this.room ? this.getDaysForRoom(this.room) : this.getAllRoomsDays();
        return this.filterDaysGivenCheckIn(days);
    }

    private filterRoomsGivenCheckIn(rooms: Room[]): Room[] {
        if (this.checkIn) {
            return rooms.filter(r => {
                return this.findPeriod(r, this.checkIn.id).length
            });
        }
        return rooms;
    }

    private filterDaysGivenCheckIn(days: Day[]): Day[] {
        if (this.checkIn) {
            if (this.room) {
                let period = this.findPeriod(this.room, this.checkIn.id);
                let ids = this.getDayIdsFrom(period, this.checkIn.id);
                return this.days.getByIds(ids);
            }
        }
        return days;
    }

    private getDayIdsFrom(period: string[], dayId: string) : string[] {
        let found = false;
        return period.filter(id => found = (found || id === dayId));
    }

    private findPeriod(room: Room, dateId: string): string[] {
        let periods = room.periods.filter(p => p.find(id => id === dateId));
        return periods.length > 0 ? periods[0] : [];
    }

    private getDaysForRoom(room: Room): Day[] {
        let day_ids: any = {};
        // Loop for each day_id in each periods of selected room
        // and save id in temporary array
        room.periods.forEach(p => p.forEach(id => day_ids[id] = true));
        // Create new array od Days identifiers are present in the array
        return this.days.items.filter(d => !!day_ids[d.id]);
    }

    private getAllRoomsDays(): Day[] {
        let day_ids: any = {};
        // Loop for each day_id in each periods in each rooms
        // and save id in temporary array
        this.rooms.items.forEach(r => r.periods.forEach(p => p.forEach(id => day_ids[id] = true)));
        // Create new array od Days identifiers are present in the array
        return this.days.items.filter(d => !!day_ids[d.id]);
    }
}