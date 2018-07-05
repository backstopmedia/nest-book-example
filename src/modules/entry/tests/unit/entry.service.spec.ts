import * as utilities from '../utilities';
import moment from 'moment';
import { databaseProvider } from '../../../database/database.provider';
import { entryProvider } from '../../entry.provider';
import { EntryService } from '../../entry.service';
import { IEntry } from '../../interfaces/index';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';

describe('EntryService', () => {
    let sequelizeInstance: any;
    let entryService: EntryService;
    let fakeEntries: Array<IEntry>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [entryProvider, EntryService]
        }).compile();

        sequelizeInstance = module.get<any>(databaseProvider.provide);

        entryService = module.get<EntryService>(EntryService);
    });

    beforeEach(async () => {
        await sequelizeInstance.sync();

        const [, userId] = await sequelizeInstance.query(
            `
            INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
            values(
                'test@test.fr', 
                'test', 
                'test', 
                'test', 
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `,
            { type: sequelizeInstance.QueryTypes.INSERT }
        );
        fakeEntries = utilities.generateFakeEntries(userId);
    });

    it('should create a new entry', async () => {
        const entry = await entryService.create(fakeEntries[0]);

        expect(entry).not.toBeNull();
        expect(entry.title).toBe(fakeEntries[0].title);
        expect(entry.content).toBe(fakeEntries[0].content);
    });

    it('should find all entries', async () => {
        await sequelizeInstance.query(`
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                '${fakeEntries[0].title}', 
                '${fakeEntries[0].content}',
                '${fakeEntries[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const entries = await entryService.findAll();

        expect(entries.length).toBe(1);
        expect(entries[0]).not.toBeNull();
        expect(entries[0].title).toBe(fakeEntries[0].title);
        expect(entries[0].content).toBe(fakeEntries[0].content);
    });

    it('should find one entry', async () => {
        await sequelizeInstance.query(`
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                '${fakeEntries[0].title}', 
                '${fakeEntries[0].content}',
                '${fakeEntries[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const entry = await entryService.findOne();

        expect(entry).not.toBeNull();
        expect(entry.title).toBe(fakeEntries[0].title);
        expect(entry.content).toBe(fakeEntries[0].content);
    });

    it('should find entry by id', async () => {
        await sequelizeInstance.query(`
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                '${fakeEntries[0].title}', 
                '${fakeEntries[0].content}',
                '${fakeEntries[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const entry = await entryService.findById(1);

        expect(entry).not.toBeNull();
        expect(entry.title).toBe(fakeEntries[0].title);
        expect(entry.content).toBe(fakeEntries[0].content);
    });

    it('should delete entry by id', async () => {
        await sequelizeInstance.query(`
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                '${fakeEntries[0].title}', 
                '${fakeEntries[0].content}',
                '${fakeEntries[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        await entryService.delete(1);
        const entries = await entryService.findAll();

        expect(entries.length).toBe(0);
    });

    it('should update entry', async () => {
        await sequelizeInstance.query(`
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                '${fakeEntries[0].title}', 
                '${fakeEntries[0].content}',
                '${fakeEntries[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const entry = await entryService.update(1, {
            title: 'updatedTitle'
        } as IEntry);

        expect(entry).not.toBeNull();
        expect(entry.title).toBe('updatedTitle');
        expect(entry.content).toBe(fakeEntries[0].content);
    });
});
