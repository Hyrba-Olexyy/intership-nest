import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../v1/users/users.module';
import { AuthModule } from '../v1/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/users_nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
