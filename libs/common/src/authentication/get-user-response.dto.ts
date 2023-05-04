import { ApiProperty } from '@nestjs/swagger';
import { IAuthenticationResponse, IUser } from '.';

export class GetUserResponseDto implements IAuthenticationResponse {
  @ApiProperty({ example: 200 })
  status: number;
  @ApiProperty({ example: 'get_user_success' })
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
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
