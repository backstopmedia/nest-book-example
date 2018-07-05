import { Injectable, Inject } from '@nestjs/common';
import { IUser, IUserService } from './interfaces/index';
import { User } from './user.entity';
import { DatabaseUtilitiesService } from '../database/database-utilities.service';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('UserRepository') private readonly UserRepository: typeof User,
        @Inject('SequelizeInstance') private readonly sequelizeInstance,
        private readonly databaseUtilitiesService: DatabaseUtilitiesService
    ) {}

    public async findAll(options?: object): Promise<Array<User>> {
        return await this.UserRepository.findAll<User>(options);
    }

    public async findOne(options?: object): Promise<User | null> {
        return await this.UserRepository.findOne<User>(options);
    }

    public async findById(id: number): Promise<User | null> {
        return await this.UserRepository.findById<User>(id);
    }

    public async create(user: IUser): Promise<User> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.UserRepository.create<User>(user, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: IUser): Promise<User | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.UserRepository.findById<User>(id, {
                transaction
            });
            if (!user) throw new Error('The user was not found.');

            user = this.databaseUtilitiesService.assign(user, newValue);
            return await user.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.UserRepository.destroy({
                where: { id },
                transaction
            });
        });
    }
}
