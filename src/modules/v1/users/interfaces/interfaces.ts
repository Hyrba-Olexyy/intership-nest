import { ObjectId } from 'mongoose';

export class Projection {
  [index: string]: number;
}

export interface IConstants {
  secret: string;
  secretRefresh: string;
  refreshTime: string;
}
export interface IPayload {
  username: string;
  sub: ObjectId;
}
