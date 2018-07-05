import * as utilities from '../utilities';
import moment from 'moment';
import { commentProvider } from '../../comment.provider';
import { CommentService } from '../../comment.service';
import { databaseProvider } from '../../../database/database.provider';
import { IComment } from '../../interfaces/index';
import { Test } from '@nestjs/testing';

describe('CommentService', () => {
    let sequelizeInstance: any;
    let commentService: CommentService;
    let fakeComments: Array<IComment>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [commentProvider, databaseProvider, CommentService]
        }).compile();

        sequelizeInstance = module.get<any>(databaseProvider.provide);

        commentService = module.get<CommentService>(CommentService);
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

        const [, entryId] = await sequelizeInstance.query(
            `
            INSERT INTO entries ("title", "content", "userId", "createdAt", "updatedAt")
            values(
                'entryTitle', 
                'entryContent', 
                '${userId}', 
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `,
            { type: sequelizeInstance.QueryTypes.INSERT }
        );

        fakeComments = utilities.generateFakeComments(userId, entryId);
    });

    it('should create a new comment', async () => {
        const comment = await commentService.create(fakeComments[0]);

        expect(comment).not.toBeNull();
        expect(comment.body).toBe(fakeComments[0].body);
    });

    it('should find all comments', async () => {
        await sequelizeInstance.query(`
            INSERT INTO comments ("body", "entryId", "userId", "createdAt", "updatedAt")
            values(
                '${fakeComments[0].body}', 
                '${fakeComments[0].entryId}',
                '${fakeComments[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const comments = await commentService.findAll();

        expect(comments.length).toBe(1);
        expect(comments[0]).not.toBeNull();
        expect(comments[0].body).toBe(fakeComments[0].body);
    });

    it('should find one comment', async () => {
        await sequelizeInstance.query(`
            INSERT INTO comments ("body", "entryId", "userId", "createdAt", "updatedAt")
            values(
                '${fakeComments[0].body}', 
                '${fakeComments[0].entryId}',
                '${fakeComments[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const comment = await commentService.findOne();

        expect(comment).not.toBeNull();
        expect(comment.body).toBe(fakeComments[0].body);
    });

    it('should find comment by id', async () => {
        await sequelizeInstance.query(`
            INSERT INTO comments ("body", "entryId", "userId", "createdAt", "updatedAt")
            values(
                '${fakeComments[0].body}', 
                '${fakeComments[0].entryId}',
                '${fakeComments[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const comment = await commentService.findById(1);

        expect(comment).not.toBeNull();
        expect(comment.body).toBe(fakeComments[0].body);
    });

    it('should delete comment by id', async () => {
        await sequelizeInstance.query(`
            INSERT INTO comments ("body", "entryId", "userId", "createdAt", "updatedAt")
            values(
                '${fakeComments[0].body}', 
                '${fakeComments[0].entryId}',
                '${fakeComments[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        await commentService.delete(1);
        const comments = await commentService.findAll();

        expect(comments.length).toBe(0);
    });

    it('should update comment', async () => {
        await sequelizeInstance.query(`
            INSERT INTO comments ("body", "entryId", "userId", "createdAt", "updatedAt")
            values(
                '${fakeComments[0].body}', 
                '${fakeComments[0].entryId}',
                '${fakeComments[0].userId}',
                '${moment().format('YYYY-MM-DD')}',
                '${moment().format('YYYY-MM-DD')}'
            );
        `);

        const comment = await commentService.update(1, {
            body: 'updatedTitle'
        } as IComment);

        expect(comment).not.toBeNull();
        expect(comment.body).toBe('updatedTitle');
    });
});
