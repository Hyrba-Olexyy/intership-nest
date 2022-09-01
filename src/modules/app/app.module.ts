import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import AppService from './app.service';
import UserModule from '../v1/users/users.module';
import AuthModule from '../v1/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        AuthModule,
        MongooseModule.forRoot('mongodb+srv://Oleksii:Rupapi_84@cluster0.dssexcx.mongodb.net/?retryWrites=true&w=majority'),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export default class AppModule {}
