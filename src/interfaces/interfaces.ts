import { ObjectId } from 'mongoose';

export interface IProjection {
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

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignOut {
  data: {
    message: string;
  }
}
