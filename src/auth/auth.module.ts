import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from 'src/user/user.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserController,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
