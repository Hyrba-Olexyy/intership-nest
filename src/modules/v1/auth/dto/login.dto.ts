import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class LoginDto {
    constructor(body: LoginDto | null = null) {
        if (body) {
            this.email = body.email;
            this.password = body.password;
        }
    }

  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsString()
    readonly email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  readonly password: string;
}
