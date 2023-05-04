import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { IUser } from '@common/authentication';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as module from 'module';

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
  let jwtService: JwtService;

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
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const user = await createUser(service, 'user@email.com', 'test');

    expect(service.getUserByEmail(user.email).email).toEqual(user.email);
  });

  it('should find user', async () => {
    const email = 'user@email.com';
    const user = await createUser(service, email, 'test');

    expect(service.findOne(email).data?.user?.email).toEqual(user.email);
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
    const user = await service.getUserByToken(createdUser.token);

    expect(user.email).toEqual(createdUser.email);
  });

  it('should fail to validate token on wrong email payload', async () => {
    const email = 'user@email.com';
    const otherEmail = 'other@email.com';
    const password = 'test';

    const token = await jwtService.signAsync({ email: otherEmail });

    const createdUser = await createUser(service, email, password);

    const user = await service.getUserByToken(token);

    expect(user?.email).not.toEqual(createdUser.email);
  });

  it('should fail to validate token on expired token', async () => {
    const email = 'user@email.com';
    const password = 'test';

    const createdUser = await createUser(service, email, password);

    const token = await jwtService.signAsync({ email: createdUser.email }, { expiresIn: '0s' });

    const user = await service.getUserByToken(token);

    expect(user).toBeUndefined();
  });
});
