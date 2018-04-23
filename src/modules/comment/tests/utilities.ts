import * as _ from 'lodash';
import { IComment } from '../interfaces';

export function generateFakeComments(userId, entryId, count: number = 1) {
    return _.range(0, count).map(i => ({
        body: `body${i}`,
        entryId: entryId,
        userId: userId,
    } as IComment ));
}
