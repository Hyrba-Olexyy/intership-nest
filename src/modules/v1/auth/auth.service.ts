/* eslint-disable @typescript-eslint/naming-convention */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ObjectId } from 'mongoose';
import UserService from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import jwtConstants from './constants';
import { IPayload, ISignOut } from '../../../interfaces/interfaces';
import ResponseLoginDto from './dto/response-login.dto';

@Injectable()
export default class AuthService {
    constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user: User = await this.usersService.getByEmail(email);

        if (user && (await compare(pass, user.password))) return user;

        return null;
    }

    async login({ email, _id }: User): Promise<ResponseLoginDto> {
        const payload: IPayload = { email, _id };

        const refreshToken: string = this.jwtService.sign(payload, {
            secret: jwtConstants.secretRefresh,
            expiresIn: jwtConstants.refreshTime,
        });

        await this.usersService.update(_id, { refreshToken });

        return {
            data: {
                user: { email, _id },
                access_token: this.jwtService.sign(payload),
                refreshToken,
            },
        };
    }

    async signOut(_id: ObjectId): Promise<ISignOut> {
        const user: User = await this.usersService.getById(_id, {
            refreshToken: 1,
        });

        if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

        if (user?.refreshToken) {
            await this.usersService.update(_id, { refreshToken: null });
        }

        return { data: { message: 'logout' } };
    }

    verifyRefresh(oldToken: string) {
        return this.jwtService.verifyAsync(oldToken, {
            secret: jwtConstants.secretRefresh,
        });
    }

    async refreshToken(oldRefreshToken: string): Promise<ResponseLoginDto> {
        const { _id } = await this.verifyRefresh(oldRefreshToken);

        const user: User = await this.usersService.getById(_id, {
            email: 1,
            refreshToken: 1,
        });

        if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        if (user?.refreshToken === oldRefreshToken) {
            const { email } = user;

            const payload: IPayload = { email, _id };

            const refreshToken: string = this.jwtService.sign(payload, {
                secret: jwtConstants.secretRefresh,
                expiresIn: jwtConstants.refreshTime,
            });

            await this.usersService.update(_id, { refreshToken });

            return {
                data: {
                    user: { email, _id },
                    access_token: this.jwtService.sign(payload),
                    refreshToken,
                },
            };
        }

        return null;
    }
}
