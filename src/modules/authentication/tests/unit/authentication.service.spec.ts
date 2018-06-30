import { Test  } from '@nestjs/testing';
import { AuthenticationService } from '../../authentication.service';
import { UserModule } from '../../../user/user.module';
import { UserService } from '../../../user/user.service';

describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
            providers: [AuthenticationService]
        })
        .overrideComponent(UserService).useValue({ findOne: () => true })
        .compile();

        authenticationService = module.get<AuthenticationService>(AuthenticationService);
    });

    it('should return a token', async () => {
        const result = authenticationService.createToken('test@test.fr');

        expect(result).not.toBeNull();
        expect(result.access_token).not.toBeNull();
        expect(result.expires_in).toBe(3600);
    });

    it('should validate the user', async () => {
        const result = await authenticationService.validateUser({ email: 'test@test.fr', password: 'password' });

        expect(result).toBe(true);
    });
});
