import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { IUser } from '@package/common';

const createUser = (
  service: AuthenticationService,
  email: string,
  password: string,
): IUser | undefined => {
  const response = service.create({ email, password });
  return response.data?.user;
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', () => {
    const user = createUser(service, 'user@email.com', 'test');
    expect(service.users).toContainEqual(user);
  });

  it('should find user', () => {
    const email = 'user@email.com';
    const user = createUser(service, email, 'test');

    expect(service.findOne(email).data?.user).toStrictEqual(user);
  });
});
