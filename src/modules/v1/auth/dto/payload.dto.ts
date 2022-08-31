import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export default class PayloadDto {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsString()
    readonly email: string;

  @ApiProperty({ type: String, required: true })
      _id: ObjectId;
}
