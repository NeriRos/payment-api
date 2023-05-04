import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { IUser } from '@common/authentication';
import { JwtModule } from '@nestjs/jwt';

const createUser = async (
  service: AuthenticationService,
  email: string,
  password: string,
): Promise<IUser | undefined> => {
  const response = await service.create({ email, password });
  return { ...response.data?.user, token: response.data?.token };
};

const loginUser = async (
  service: AuthenticationService,
  email: string,
  password: string,
): Promise<IUser | undefined> => {
  const response = await service.login(email, password);
  return { ...response.data?.user, token: response.data?.token };
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'test',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [AuthenticationService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const user = await createUser(service, 'user@email.com', 'test');

    expect(service.users).toContainEqual(user);
  });

  it('should find user', async () => {
    const email = 'user@email.com';
    const user = await createUser(service, email, 'test');

    expect(service.findOne(email).data?.user).toStrictEqual(user);
  });

  it('should login user', async () => {
    const email = 'user@email.com';
    const password = 'test';
    await createUser(service, email, password);
    const userResponse = await loginUser(service, email, password);

    expect(userResponse).toHaveProperty('email', email);
  });

  it('should return user using token', async () => {
    const email = 'user@email.com';
    const password = 'test';
    const createdUser = await createUser(service, email, password);
    const user = service.getUserByToken(createdUser.token);

    expect(user.email).toEqual(createdUser.email);
  });
});
