import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
