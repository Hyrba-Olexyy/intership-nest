import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { User } from '../../users/schemas/users.schema';
import AuthService from '../auth.service';
import LoginDto from '../dto/login.dto';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(
        req: Request,
        email: string,
        password: string,
    ): Promise<User> {
        const errors = (await validate(
            new LoginDto(req.body),
        ));

        if (errors.length > 0) {
            throw new BadRequestException('Incorrect login or password!');
        }

        return this.authService.validateUser(email, password);
    }
}
