import * as _ from 'lodash';
import { IEntry } from '../interfaces';

export function generateFakeEntries(userId, count: number = 1) {
    return _.range(0, count).map(i => ({
        title: `title${i}`,
        content: `content${i}`,
        userId: userId
    } as IEntry ));
}
