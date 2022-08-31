import { ObjectId } from 'mongodb';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
    transform(value: string): ObjectId {
        const validObjectId: boolean = ObjectId.isValid(value);

        if (!validObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }

        const objectId: ObjectId = ObjectId.createFromHexString(value);

        return objectId;
    }
}
