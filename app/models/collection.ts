import {CollectionItem} from './collectionItem';
/**
 * Created by Buzzer on 21.11.2016.
 */

export class Collection<T extends CollectionItem> {
    items: T[];

    constructor(items: T[] = []) {
        this.items = items;
    }

    public get(id: string): T {
        return this.items.find(i => id === i.id);
    }

    public getByIds(ids: string[]): T[] {
        return this.items.filter(i => !!ids.find(id => id === i.id));
    }
}