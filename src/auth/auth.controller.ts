import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { InvalidAuth } from 'src/errors/InvalidAuth.error';
import { UserAlreadyExist } from 'src/errors/UserAlreadyExist.error';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokentDTO } from '../token/dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async login(@Body(ValidationPipe) userDTO: CreateUserDTO) {
    try {
      return await this.authService.login(userDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidAuth)
        throw new HttpException('Invalid login or password', HttpStatus.FORBIDDEN);
      throw e;
    }
  }

  @Post('signup')
  @Header('Content-Type', 'application/json')
  async signup(@Body(ValidationPipe) userDTO: CreateUserDTO) {
    try {
      return await this.authService.signup(userDTO);
    } catch (e: unknown) {
      if (e instanceof UserAlreadyExist) throw new BadRequestException('Sign up user failed');
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @Header('Content-Type', 'application/json')
  async refresh(@Body(ValidationPipe) refreshDTO: RefreshTokentDTO) {
    try {
      return await this.authService.refresh(refreshDTO);
    } catch (e: unknown) {
      throw new HttpException('Refresh token is invalid or expired', HttpStatus.FORBIDDEN);
    }
  }
}
