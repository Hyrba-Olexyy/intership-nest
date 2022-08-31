import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

@Schema({
    collection: 'users_nest',
    versionKey: false,
    timestamps: true,
})
export class User {
  @ApiProperty({ type: String })
  @Prop({ required: true, type: String, trim: true })
      email?: string;

    @ApiProperty({ type: String })
  @Prop({ required: true, type: String, trim: true })
        fullName?: string;

    @ApiProperty({ type: String })
  @Prop({ required: true, type: String, trim: true })
        password?: string;

    @ApiProperty({ type: String })
  @Prop({ type: String })
        refreshToken?: string;

    @ApiProperty({ type: String })
        _id: ObjectId;
}

export type UserDocument = User & Document;

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);
