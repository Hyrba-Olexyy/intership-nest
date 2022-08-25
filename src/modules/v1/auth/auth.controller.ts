import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreateUserDto from '../users/dto/create-user.dto';
import UserService from '../users/users.service';
import AuthService from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('v1/auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('sign-up')
  async signUp(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async signOut(@Request() req) {
    return this.authService.signOut(req.user._id);
  }

  @Post('refresh')
  async refreshToken(@Body() { refreshToken }: any) {
    return this.authService.refreshToken(refreshToken);
  }
}
