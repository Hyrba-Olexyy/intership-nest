import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RefreshDto {
    constructor(body: RefreshDto | null = null) {
        if (body) {
            this.refreshToken = body.refreshToken;
        }
    }

  @ApiProperty({ type: String, required: true })
  @IsString()
    readonly refreshToken: string;
}
