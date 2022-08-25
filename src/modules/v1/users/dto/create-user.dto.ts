import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly fullName: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
