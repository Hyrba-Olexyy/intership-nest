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
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserService from './users.service';
import { User } from './schemas/users.schema';
import ParseObjectIdPipe from '../../../pipes/parse-object-id.pipe';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import ArrUsersEntyties from './entyties/ArrUsersEntyties';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('v1/user')
export default class UserController {
    constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '401. UnauthorizedException.',
      status: 401,
  })
  @ApiOkResponse({ type: ArrUsersEntyties, status: 200 })
  @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

  @ApiNotFoundResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '404. NotFoundException. User was not found',
      status: 404,
  })
  @ApiUnauthorizedResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '401. UnauthorizedException.',
      status: 401,
  })
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', type: String, required: true })
  @Get(':id')
  async getOne(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<User> {
      const user: User = await this.userService.getById(id, {
          password: 0,
          refreshToken: 0,
      });

      if (user === null) { throw new HttpException('User not found', HttpStatus.NOT_FOUND); }

      return user;
  }

  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Data is not valid',
      status: 400,
  })
  @ApiConflictResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '409. Conflict. This user already exists',
      status: 409,
  })
  @ApiUnauthorizedResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '401. UnauthorizedException.',
      status: 401,
  })
  @ApiCreatedResponse({ type: User, status: 201 })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUser: CreateUserDto): Promise<User> {
      return this.userService.create(createUser);
  }

  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Data is not valid',
      status: 400,
  })
  @ApiNotFoundResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '404. NotFoundException. User was not found',
      status: 404,
  })
  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Id is not valid',
      status: 400,
  })
  @ApiUnauthorizedResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '401. UnauthorizedException.',
      status: 401,
  })
  @ApiCreatedResponse({ type: User, status: 201 })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', type: String, required: true })
  @Put(':id')
  async update(
    @Body() updateUser: UpdateUserDto,
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<User> {
      const user: User = await this.userService.update(id, updateUser);

      if (user === null) { throw new HttpException('User not found', HttpStatus.NOT_FOUND); }

      return user;
  }

  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Id is not valid',
      status: 400,
  })
  @ApiNotFoundResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '404. NotFoundException. User was not found',
      status: 404,
  })
  @ApiUnauthorizedResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '401. UnauthorizedException.',
      status: 401,
  })
  @ApiNoContentResponse({ type: User, status: 204 })
  @ApiParam({ name: 'id', type: String, required: true })
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<User> {
      const user: User = await this.userService.remove(id);

      if (user === null) { throw new HttpException('User not found', HttpStatus.NOT_FOUND); }

      return user;
  }
}
