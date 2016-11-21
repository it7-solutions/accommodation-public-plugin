import {CollectionItem} from './collectionItem';
/**
 * Created by Buzzer on 21.11.2016.
 */

export class Room extends CollectionItem {
    hotel_id: string;
    periods: Array<Array<string>>;
    allow_share: boolean;
}