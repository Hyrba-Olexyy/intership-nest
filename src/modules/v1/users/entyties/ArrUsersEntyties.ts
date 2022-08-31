import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/users.schema';

export default class ArrUsersEntyties {
    @ApiProperty({ type: User, required: true })
      arr: [];
}
