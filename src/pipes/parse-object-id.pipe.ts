import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): ObjectId {
    const validObjectId: boolean = ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId: ObjectId = ObjectId.createFromHexString(value);
    return objectId;
  }
}
