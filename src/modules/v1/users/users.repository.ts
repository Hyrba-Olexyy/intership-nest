import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Projection } from './interfaces/interfaces';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(projection: Projection): Promise<User[] | null> {
    return this.userModel.find(projection).exec();
  }

  async getById(id: ObjectId, projection: Projection): Promise<User | null> {
    return this.userModel.findById(id, projection).exec();
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(CreateUser: CreateUserDto): Promise<User | null> {
    return this.userModel.create(CreateUser);
  }

  async remove(id: ObjectId): Promise<User | null> {
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: ObjectId, updateUser: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUser);
  }
}
