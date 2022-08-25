import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({
  collection: 'users_nest',
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop({ required: true, type: String, trim: true })
    email?: string;

  @Prop({ required: true, type: String, trim: true })
    fullName?: string;

  @Prop({ required: true, type: String, trim: true })
    password?: string;

  @Prop({ type: String })
    refreshToken?: string;

  _id?: ObjectId;
}

export type UserDocument = User & Document;

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);
