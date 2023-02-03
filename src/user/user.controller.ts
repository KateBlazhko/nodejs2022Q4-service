import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @Post()
    async create(@Body() createCatDto: CreateUserDTO) {
        this.usersService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
