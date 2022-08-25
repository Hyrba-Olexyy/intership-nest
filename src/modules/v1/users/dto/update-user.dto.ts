import { PartialType, OmitType } from '@nestjs/swagger';
// import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [] as const),
) {
  // @ApiProperty()
  // @IsEmail()
  // @IsString()
  // readonly email?: string;
  // @ApiProperty()
  // @IsString()
  // readonly fullName?: string;
  // @ApiProperty()
  // @IsString()
  // readonly password?: string;
  // @ApiProperty()
  // @IsString()
  // readonly refreshToken?: string;
}
