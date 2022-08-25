import { ObjectId } from 'mongoose';

export class Projection {
  // eslint-disable-next-line no-undef
  [index: string]: number;
}

export interface IConstants {
  secret: string;
  secretRefresh: string;
  refreshTime: string;
}

export interface IPayload {
  email: string;
  _id: ObjectId;
}
