import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { hash } from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import UserRepository from './users.repository';
import { Projection } from '../../../interfaces/interfaces';

@Injectable()
export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll({ password: 0, refreshToken: 0 });
  }

  async getById(id: ObjectId, projection: Projection): Promise<User> {
    return this.userRepository.getById(id, projection);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const hashPasswor: string = await hash(createUser.password, 10);
    const user: CreateUserDto = { ...createUser, password: hashPasswor };

    return this.userRepository.create(user);
  }

  async remove(id: ObjectId): Promise<User> {
    return this.userRepository.remove(id);
  }

  async update(id: ObjectId, updateUser: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUser);
  }
}
