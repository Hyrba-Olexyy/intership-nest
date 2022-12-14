import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String })
  @ApiProperty()
  @IsString()
  readonly fullName?: string;

  @ApiProperty({ type: String, required: true })
  @ApiProperty()
  @IsString()
  readonly password: string;
}
