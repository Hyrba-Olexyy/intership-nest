import {
    Controller,
    UseGuards,
    Post,
    Get,
    Body,
} from '@nestjs/common';
import ReqUser from 'src/decorators/req-user.decorator';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import CreateUserDto from '../users/dto/create-user.dto';
import UserService from '../users/users.service';
import AuthService from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import { User } from '../users/schemas/users.schema';
import LoginDto from './dto/login.dto';
import RefreshDto from './dto/refresh.dto';
import PayloadDto from './dto/payload.dto';
import ResponseLoginDto from './dto/response-login.dto';
import LogoutResEntity from './entyties/LogoutResEntity';

@ApiTags('Auth')
@Controller('v1/auth')
export default class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Incorrect login or password!',
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
  @ApiOkResponse({ type: ResponseLoginDto, status: 200 })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
    async login(@ReqUser() user: User) {
        return this.authService.login(user);
    }

  @ApiOkResponse({ type: PayloadDto, status: 200 })
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@ReqUser() user: PayloadDto) {
      return user;
  }

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
  @ApiCreatedResponse({ type: User, status: 201 })
  @ApiBody({ type: CreateUserDto })
  @Post('sign-up')
  async signUp(@Body() createUser: CreateUserDto) {
      return this.userService.create(createUser);
  }

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
  @ApiNoContentResponse({ type: LogoutResEntity, status: 204 })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async signOut(@ReqUser() user: PayloadDto) {
      return this.authService.signOut(user._id);
  }

  @ApiBadRequestResponse({
      schema: {
          type: 'object',
          example: {
              message: 'string',
          },
      },
      description: '400. Incorrect refreshToken',
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
  @ApiOkResponse({ type: ResponseLoginDto, status: 200 })
  @ApiBody({ type: RefreshDto })
  @Post('refresh')
  async refreshToken(@Body() { refreshToken }: RefreshDto) {
      return this.authService.refreshToken(refreshToken);
  }
}
