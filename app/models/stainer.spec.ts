import {Collection} from './collection';
import {Day} from './day';
import {Room} from './room';
import {Hotel} from './hotel';
import {Stainer} from './stainer';

function createStainer(hotels: any[], rooms: any[], days: any[]) {
    return new Stainer(
        new Collection<Hotel>(hotels),
        new Collection<Room>(rooms),
        new Collection<Day>(days)
    );
}

describe('Stainer class', () => {
    it('should return all days if room not set', () => {
        let stainer = createStainer(
            [],
            [{id: '1', periods: [['10.11']]}],
            [{id: '10.11'}, {id: '11.11'}]
        );
        expect(stainer.getDays()).toEqual([{id: '10.11'}, {id: '11.11'}], 'should pass');
    });

    it('should return only room days if room set', () => {
        let stainer = createStainer(
            [],
            [{id: '1', periods: [['10.11']]}],
            [{id: '10.11'}, {id: '11.11'}]
        );
        stainer.setRoom('1');
        expect(stainer.getDays()).toEqual([{id: '10.11'}], 'should pass');
    });
});
