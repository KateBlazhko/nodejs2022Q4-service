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
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { InvalidAuth } from 'src/errors/InvalidAuth.error';
import { UserAlreadyExist } from 'src/errors/UserAlreadyExist.error';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokentDTO } from '../token/dto/refresh-token.dto';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { InvalidRefreshToken } from 'src/errors/InvalidRefresh.error';
import { ValidationError } from 'class-validator';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @Header('Content-Type', 'application/json')
  async refresh(
    @Body(
      new ValidationPipe({
        exceptionFactory: () => new UnauthorizedException('Refresh token is invalid'),
      }),
    )
    refreshDTO: RefreshTokentDTO,
  ) {
    try {
      return await this.authService.refresh(refreshDTO);
    } catch (e: unknown) {
      throw new HttpException('Refresh token is invalid or expired', HttpStatus.FORBIDDEN);
    }
  }
}
