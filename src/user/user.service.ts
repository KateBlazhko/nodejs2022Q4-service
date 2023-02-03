import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(private database: DatabaseService) {}

    create(user: CreateUserDTO) {
        this.database.users.create(user)
    }
    
    async findAll(): Promise<User[]> {
        return await this.database.users.findMany();
    }

}
