import { Test } from '@nestjs/testing';
import express from 'express';
import request from 'supertest';
import * as utilities from '../utilities';
import { DatabaseModule } from '../../../database/database.module';
import { UserService } from '../../user.service';
import { UserController } from '../../user.controller';
import { userProvider } from '../../user.provider';

describe('UserController', () => {
    const server = express();
    const fakeUsers = utilities.generateFakeUsers();
    const userService = {
        findAll: () => fakeUsers,
        create: () => 'created',
        findById: () => fakeUsers[0],
        update: () => 'updated',
        delete: () => 'deleted'
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [UserController],
            providers: [userProvider, UserService]
        })
        .overrideComponent(UserService).useValue(userService)
        .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it('should return all users', async () => {
        return request(server)
            .get('/users')
            .expect(200)
            .expect(userService.findAll())
    });

    it('should return one user', async () => {
        return request(server)
            .get('/users/1')
            .expect(200)
            .expect(userService.findById())
    });

    it('should create a user', async () => {
        return request(server)
            .post('/users')
            .send(fakeUsers[0])
            .expect(201)
    });

    it('should update a user by id', async () => {
        return request(server)
            .put('/users/1')
            .send(fakeUsers[0])
            .expect(200);
    });

    it('should delete a user by id', async () => {
        return request(server)
            .delete('/users/1')
            .expect(200);
    });
});
