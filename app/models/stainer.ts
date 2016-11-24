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
        return this.filterRoomsGivenDates(rooms);
    }

    public getCheckInDays(): Day[] {
        let days: Day[] = this.room ? this.getDaysForRoom(this.room) : this.getAllRoomsDays();
        return this.filterDaysGivenCheckOut(days);
    }

    public getCheckOutDays(): Day[] {
        let days: Day[] = this.room ? this.getDaysForRoom(this.room) : this.getAllRoomsDays();
        return this.filterDaysGivenCheckIn(days);
    }

    private filterRoomsGivenDates(rooms: Room[]): Room[] {
        if (this.checkIn) {
            if (this.checkOut) {
                // For cases filled Check-in and/or-not Check-out
                return rooms.filter(r => {
                    return this.findPeriod(r, this.checkIn.id, this.checkOut.id).length
                });
            } else {
                // For cases filled Check-in only
                return rooms.filter(r => {
                    return this.findPeriod(r, this.checkIn.id).length
                });
            }
        } else if (this.checkOut) {
            // For cases filled Check-out only
            return rooms.filter(r => {
                return this.findPeriod(r, this.checkOut.id).length
            });
        }
        return rooms;
    }

    private filterDaysGivenCheckOut(days: Day[]): Day[] {
        if (this.checkOut) {
            if (this.room) {
                let period = this.findPeriod(this.room, this.checkOut.id);
                let ids = this.getDayIdsTo(period, this.checkOut.id);
                return this.days.getByIds(ids);
            } else if (this.hotel) {
                let ids: string[] = [];
                this.rooms.items.forEach(
                    r => {
                        if(this.hotel.id === r.hotel_id) {
                            let period = this.findPeriod(r, this.checkOut.id);
                            this.getDayIdsTo(period, this.checkOut.id).forEach(id => ids.push(id));
                        }
                    }
                );
                return this.days.getByIds(ids);
            }
        }
        return days;
    }

    private filterDaysGivenCheckIn(days: Day[]): Day[] {
        if (this.checkIn) {
            if (this.room) {
                // If select Room
                let period = this.findPeriod(this.room, this.checkIn.id);
                let ids = this.getDayIdsFrom(period, this.checkIn.id);
                return this.days.getByIds(ids);
            } else if (this.hotel) {
                // If select Only Hotel
                let ids: string[] = [];
                this.rooms.items.forEach(
                    r => {
                        if(this.hotel.id === r.hotel_id){
                            let period = this.findPeriod(r, this.checkIn.id);
                            this.getDayIdsFrom(period, this.checkIn.id).forEach(id => ids.push(id));
                        }
                    }
                );
                return this.days.getByIds(ids);
            }
        }
        return days;
    }

    private getDayIdsTo(period: string[], dayId: string): string[] {
        let found = false;
        return period.filter(
            id => {
                let current = id === dayId;
                found = (found || current);
                return !found || current;
            }
        );
    }

    private getDayIdsFrom(period: string[], dayId: string) : string[] {
        let found = false;
        return period.filter(id => found = (found || id === dayId));
    }

    private findPeriod(room: Room, date1Id: string, date2Id: string = ''): string[] {
        let periods: string[][];
        if (date2Id) {
            periods = room.periods.filter(p => p.find(id => id === date1Id) && p.find(id => id === date2Id));
        } else {
            periods = room.periods.filter(p => p.find(id => id === date1Id));
        }
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
        if (this.hotel) {
            // Loop for each day_id in each periods in each hotel rooms
            // and save id in temporary array
            this.rooms.items.forEach(
                r => {
                    if (r.hotel_id === this.hotel.id) {
                        r.periods.forEach(p => p.forEach(id => day_ids[id] = true))
                    }
                }
            );
        } else {
            // Loop for each day_id in each periods in each rooms
            // and save id in temporary array
            this.rooms.items.forEach(r => r.periods.forEach(p => p.forEach(id => day_ids[id] = true)));
        }
        // Create new array od Days identifiers are present in the array
        return this.days.items.filter(d => !!day_ids[d.id]);
    }
}