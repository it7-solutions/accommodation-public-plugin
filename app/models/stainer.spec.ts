import {Collection} from './collection';
import {Day} from './day';
import {Room} from './room';
import {Hotel} from './hotel';
import {Stainer, DataContainer} from './stainer';

function createStainer(hotels: any[], rooms: any[], days: any[]) {
    return new Stainer(
        new Collection<Hotel>(hotels),
        new Collection<Room>(rooms),
        new Collection<Day>(days)
    );
}

describe('Stainer class', () => {

    describe('When all fields is empty', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}],
                [{id: '1', periods: [['05.11'], ['01.11', '02.11']]}, {id: '2', periods: [['01.11'], ['03.11']]}],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
        });

        it('Should return all days of rooms for check-in and check-out', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11', '05.11']);
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11', '05.11']);
        });

        it('Should not return any room', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual([]);
        });

        it('Should return all hotels', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select check-in only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['01.11', '02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['01.11', '02.11', '03.11']]},
                    {id: '4', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '5', hotel_id: '12', periods: [['01.11'], ['03.11', '04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setCheckInDay('02.11');
        });

        it('For check-in should return all days of rooms', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11',  '04.11', '05.11']);
        });

        it('For check-out should return days of periods with check-in date and not earlier check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11', '04.11']);
        });

        it('For rooms return empty array', () => {
            expect(stainer.getRooms().length).toEqual(0);
        });

        it('Should return all hotels room which contains the check-in', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select check-out only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['01.11'], ['02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['02.11', '03.11']]},
                    {id: '4', hotel_id: '11', periods: [['01.11'], ['02.11', '03.11', '04.11']]},
                    {id: '5', hotel_id: '12', periods: [['01.11'], ['02.11'], ['04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setCheckOutDay('03.11');
        });

        it('For check-in should return days of periods with check-out date and not later check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['02.11']);
        });

        it('For check-out should return all days of rooms', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11',  '04.11']);
        });

        it('For rooms return empty array', () => {
            expect(stainer.getRooms().length).toEqual(0);
        });

        it('Should return all hotels room which contains the date  = check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11', '12']);
        });
    });

    describe('When select dates only - check-in and check-out', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['02.11', '03.11']]},
                    {id: '4', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '5', hotel_id: '12', periods: [['01.11'], ['04.11']]},
                    {id: '6', hotel_id: '12', periods: [['01.11'], ['03.11', '04.11']]},
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setCheckInDay('02.11');
            stainer.setCheckOutDay('03.11');
        });

        it('For check-in should return days of periods with check-out date and not later check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11']);
        });

        it('For check-out should return days of periods with check-in date and not earlier check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11', '04.11']);
        });

        it('For rooms return empty array', () => {
            expect(stainer.getRooms().length).toEqual(0);
        });

        it('Should return all hotels room which contains period include simultaneously check-in and check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['01.11', '02.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11', '02.11'], ['04.11']]},
                    {id: '3', hotel_id: '11', periods: [['01.11'], ['03.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
        });

        it('Should return all days of hotel\'s rooms for check-in and check-out', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '04.11', '05.11']);
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '04.11', '05.11']);
        });

        it('Should return all rooms of hotel', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '2']);
        });

        it('Should return all hotels', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel and room only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['01.11', '02.11']]},
                    {id: '2', hotel_id: '11', periods: [['01.11'], ['03.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setRoom('1');
        });

        it('Should return all days of selected room for check-in and check-out', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '05.11']);
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '05.11']);
        });

        it('Should return all rooms of hotel', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1']);
        });

        it('Should return all hotels', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel, room and check-in', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['01.11', '02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '4', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '5', hotel_id: '12', periods: [['01.11'], ['03.11', '04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setRoom('1');
            stainer.setCheckInDay('02.11');
        });

        it('For check-in should return all days of selected room', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11', '05.11']);
        });

        it('For check-out should return days of period with check-in date and not earlier check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including check-in', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '3']);
        });

        it('Should return all hotels room which contains the check-in', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel, room and check-out', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['01.11', '02.11'], ['03.11', '04.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['02.11', '03.11', '04.11']]},
                    {id: '4', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '5', hotel_id: '12', periods: [['01.11', '02.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setRoom('1');
            stainer.setCheckOutDay('04.11');
        });

        it('For check-in should return days of period with check-out date and not later check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['03.11']);
        });

        it('For check-out should return all days of selected room', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11', '04.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including day = check-out-1', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '3']);
        });

        it('Should return all hotels room which contains the day = check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel, room and check-out set as +1 day', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['01.11', '02.11'], ['03.11', '04.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['02.11', '03.11', '04.11']]},
                    {id: '4', hotel_id: '10', periods: [['02.11', '03.11']]},
                    {id: '5', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '6', hotel_id: '12', periods: [['01.11', '02.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setRoom('1');
            stainer.setCheckOutDay('05.11');
        });

        it('For check-in should return days of period with check-out date and not later check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['03.11', '04.11']);
        });

        it('For check-out should return all days of selected room', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11', '04.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including day = check-out-1', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '2', '3']);
        });

        it('Should return all hotels room which contains the day = check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel, room, check-out and check-in', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '2', hotel_id: '10', periods: [['01.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '4', hotel_id: '10', periods: [['01.11', '02.11']]},
                    {id: '5', hotel_id: '10', periods: [['03.11', '04.11']]},
                    {id: '6', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '7', hotel_id: '12', periods: [['01.11'], ['04.11']]},
                    {id: '8', hotel_id: '12', periods: [['03.11', '04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setRoom('1');
            stainer.setCheckInDay('02.11');
            stainer.setCheckOutDay('03.11');
        });

        it('For check-in should return days of period with check-out date and not later check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11']);
        });

        it('For check-out should return days of period with check-in date and not later check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11', '04.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including simultaneously check-in and day check-out-1', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '3', '4']);
        });

        it('Should return all hotels room which contains period include simultaneously check-in and day check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel and check-in only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['02.11'], ['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['03.11', '04.11']]},
                    {id: '4', hotel_id: '10', periods: [['02.11']]},
                    {id: '5', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '6', hotel_id: '12', periods: [['01.11'], ['03.11', '04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setCheckInDay('02.11');
        });

        it('For check-in should return all days of all rooms in selected hotel', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['02.11', '03.11', '04.11', '05.11']);
        });

        it('For check-out should return days of hotel\'s periods with check-in date and not earlier check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including check-in', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '2', '4']);
        });

        it('Should return all hotels room which contains the check-in', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel and check-out only', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['02.11', '03.11']]},
                    {id: '2', hotel_id: '10', periods: [['04.11']]},
                    {id: '3', hotel_id: '10', periods: [['02.11', '03.11', '04.11']]},
                    {id: '4', hotel_id: '10', periods: [['02.11']]},
                    {id: '5', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '6', hotel_id: '11', periods: [['01.11', '02.11'], ['04.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setCheckOutDay('03.11');
        });

        it('For check-in should return days of hotel\'s periods with check-out date and not later check-out', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['02.11']);
        });

        it('For check-out should return all days of all rooms in selected hotel', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['02.11', '03.11', '04.11', '05.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including day check-out-1', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '3', '4']);
        });

        it('Should return all hotels room which contains the check-out', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('When select hotel, check-in and check-out but not select room', () => {
        let stainer: Stainer;
        beforeEach(() => {
            stainer = createStainer(
                [{id: '10'}, {id: '11'}, {id: '12'}],
                [
                    {id: '1', hotel_id: '10', periods: [['05.11'], ['02.11', '03.11', '04.11', '05.11']]},
                    {id: '2', hotel_id: '10', periods: [['02.11'], ['04.11', '05.11']]},
                    {id: '3', hotel_id: '10', periods: [['04.11', '05.11', '06.11']]},
                    {id: '4', hotel_id: '10', periods: [['01.11', '02.11', '03.11'], ['04.11']]},
                    {id: '5', hotel_id: '11', periods: [['01.11', '02.11', '03.11', '04.11']]},
                    {id: '6', hotel_id: '12', periods: [['01.11', '02.11']]},
                    {id: '7', hotel_id: '12', periods: [['04.11', '05.11', '06.11']]}
                ],
                [
                    {id: '01.11', id_check_out: '02.11'},
                    {id: '02.11', id_check_out: '03.11'},
                    {id: '03.11', id_check_out: '04.11'},
                    {id: '04.11', id_check_out: '05.11'},
                    {id: '05.11', id_check_out: '06.11'},
                    {id: '06.11', id_check_out: '07.11'},
                    {id: '07.11', id_check_out: '08.11'}
                ]
            );
            stainer.setHotel('10');
            stainer.setCheckInDay('03.11');
            stainer.setCheckOutDay('04.11');
        });

        it('For check-in should return days of hotel\'s periods with check-out date and not later day check-out-1', () => {
            expect(stainer.getCheckInDays().map(r => r.id)).toEqual(['01.11', '02.11', '03.11']);
        });

        it('For check-out should return days of hotel\'s periods with check-in date and not earlier check-in', () => {
            expect(stainer.getCheckOutDays().map(r => r.id)).toEqual(['03.11', '04.11', '05.11']);
        });

        it('For rooms should return hotel\'s rooms that have periods including simultaneously check-in and check-out-1', () => {
            expect(stainer.getRooms().map(r => r.id)).toEqual(['1', '4']);
        });

        it('Should return all hotels, room which contains period include simultaneously check-in and check-out-1', () => {
            expect(stainer.getHotels().map(h => h.id)).toEqual(['10', '11']);
        });
    });

    describe('Method actualizeData', () => {
        let dc: any;
        beforeEach(() => {
            dc = {
                hotel_id: '',
                room_type_id: '',
                date_input: '',
                date_output: '',
                hotels: [] as any[],
                rooms: [] as any[],
                checkIn: [] as any[],
                checkOut: [] as any[],
            };
        });

        it('should clear room id if room not in list', () => {
            dc.room_type_id = '1';
            dc.rooms = [{id: '2'}];

            let changed = Stainer.actualizeData(dc as DataContainer);
            expect(changed).toEqual(true);
            expect(dc.room_type_id).toEqual('');
        });

        it('should leave room id as is if room in list', () => {
            dc.room_type_id = '2';
            dc.rooms = [{id: '2'}];

            let changed = Stainer.actualizeData(dc as DataContainer);
            expect(changed).toEqual(false);
            expect(dc.room_type_id).toEqual('2');
        });
    });

});
