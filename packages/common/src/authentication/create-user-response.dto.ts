import { ApiProperty } from '@nestjs/swagger';
import { IAuthenticationResponse, IUser } from '@package/common';

export class CreateUserResponseDto implements IAuthenticationResponse {
  @ApiProperty({ example: 201 })
  status: number;
  @ApiProperty({ example: 'user_find_success' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        email: 'test@test.com',
        id: '5d987c3bfb881ec86b476bcc',
      },
    },
    nullable: true,
  })
  data: {
    user: IUser;
    token: string;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
