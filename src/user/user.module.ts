import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
