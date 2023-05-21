import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'John', required: true })
  firstName: string;

  @ApiProperty({ default: 'John', required: true })
  email: string;

  @ApiProperty({ default: 'Snow', required: true })
  lastName: string;

  @ApiProperty({ default: 'qwerty', required: true })
  password: string;
}

export class LoginDto {
  @ApiProperty({ default: 'John', required: true })
  email: string;

  @ApiProperty({ default: 'qwerty', required: true })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ default: 'John', required: true })
  id: string;

  @ApiProperty({ default: 'John' })
  firstName?: string;

  @ApiProperty({ default: 'John' })
  email?: string;

  @ApiProperty({ default: 'Snow' })
  lastName?: string;

  @ApiProperty({ default: 'qwerty' })
  password?: string;
}
