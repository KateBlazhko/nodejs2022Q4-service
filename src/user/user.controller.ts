import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Header,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
import { WrongPassword } from 'src/errors/WrongPassword.error';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return await this.usersService.create(createUserDTO);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not user with such id');
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.usersService.updatePassword(id, updatePasswordDTO);
    } catch (e: unknown) {
      if (e instanceof WrongPassword) {
        throw new ForbiddenException('Entered wrong old password');
      }
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not user with such id');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.delete(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not user with such id');
    }
  }
}
