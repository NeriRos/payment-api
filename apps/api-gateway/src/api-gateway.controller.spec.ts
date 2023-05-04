import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const mockAuthenticationClient = {
      send: jest.fn().mockImplementation(() => {
        return 'Hello World!';
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGatewayController],
      providers: [
        ApiGatewayService,
        { provide: 'AUTHENTICATION', useValue: mockAuthenticationClient },
      ],
    }).compile();

    apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      await expect(apiGatewayController.getHello()).resolves.toEqual(
        'Hello World!',
      );
    });
  });
});
