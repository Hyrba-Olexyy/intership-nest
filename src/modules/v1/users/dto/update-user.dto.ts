import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import CreateUserDto from './create-user.dto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  readonly refreshToken?: string;
}
