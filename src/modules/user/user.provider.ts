import { User } from './user.entity';

export const userProvider = {
    provide: 'UserRepository',
    useValue: User
};
