import { ApiProperty } from '@nestjs/swagger';

import PayloadDto from './payload.dto';

export default class ResponseDataDto {
  @ApiProperty({ type: PayloadDto, required: true })
      user: PayloadDto;

  @ApiProperty({ type: String, required: true })
      access_token: String;

  @ApiProperty({ type: String, required: true })
      refreshToken: String;
}
