import {
  BadRequestException,
  Body,
  Controller,
  Header,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { InvalidAuth } from 'src/errors/InvalidAuth.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { UserAlreadyExist } from 'src/errors/UserAlreadyExist.error';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokentDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async login(@Body(ValidationPipe) userDTO: CreateUserDTO) {
    try {
      return await this.authService.login(userDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidAuth) throw new UnauthorizedException('Invalid login or password');
    }
  }

  @Post('signup')
  @Header('Content-Type', 'application/json')
  async signup(@Body(ValidationPipe) userDTO: CreateUserDTO) {
    try {
      return await this.authService.signup(userDTO);
    } catch (e: unknown) {
      if (e instanceof UserAlreadyExist) throw new BadRequestException('Sign up user failed');
      // if (e instanceof NoRequiredEntity)
      //   throw new UnauthorizedException('Invalid login or password');
    }
  }

  @Post('refresh')
  @Header('Content-Type', 'application/json')
  async refresh(@Body(ValidationPipe) refreshDTO: RefreshTokentDTO) {
    try {
      return await this.authService.refresh(refreshDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidAuth) throw new UnauthorizedException('Invalid login or password');
    }
  }
}
