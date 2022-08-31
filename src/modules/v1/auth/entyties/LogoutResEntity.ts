import { ApiProperty } from '@nestjs/swagger';

export default class LogoutResEntity {
    @ApiProperty({ type: String, required: true })
    readonly message: string;
}
