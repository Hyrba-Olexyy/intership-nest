import { ApiProperty } from '@nestjs/swagger';
import ResponseDataDto from './response-data.dto';

export default class ResponseLoginDto {
  @ApiProperty({ type: ResponseDataDto, required: true })
    readonly data: ResponseDataDto;
}
