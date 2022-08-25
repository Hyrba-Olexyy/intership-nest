import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';
import { User } from './schemas/users.schema';
import { ParseObjectIdPipe } from '../../../pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<User> {
    const user: User = await this.userService.getById(id, {
      password: 0,
      refreshToken: 0,
    });

    if (user === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Post()
  create(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @Put(':id')
  async update(
    @Body() updateUser: UpdateUserDto,
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<User> {
    const user: User = await this.userService.update(id, updateUser);
    if (user === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<User> {
    const user: User = await this.userService.remove(id);
    if (user === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
