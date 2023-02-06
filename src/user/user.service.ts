import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4, validate } from 'uuid';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { WrongPassword } from '../errors/WrongPassword.error';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async create(createDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const nowDate = new Date();

    const { password, ...created } = await this.database.users.create({
      ...createDTO,
      version: 1,
      createdAt: nowDate.getTime(),
      updatedAt: nowDate.getTime(),
      id: v4(),
    });
    return created;
  }

  async updatePassword(id: string, changeDTO: UpdatePasswordDTO): Promise<Omit<User, 'password'>> {
    if (!validate(id)) throw new InvalidID('update password');

    const user: User | null = await this.database.users.findOne({ key: 'id', equals: id });

    if (!user) throw new NoRequiredEntity('update password');

    const nowDate = new Date();

    if (user.password !== changeDTO.oldPassword) throw new WrongPassword('update password');

    const { password, ...changed } = await this.database.users.change(id, {
      ...user,
      version: user.version + 1,
      password: changeDTO.newPassword,
      updatedAt: nowDate.getTime(),
    });

    return changed;
  }

  async delete(id: string): Promise<User> {
    if (!validate(id)) throw new InvalidID('delete user');

    const deleted: User | null = await this.database.users.findOne({ key: 'id', equals: id });

    if (!deleted) throw new NoRequiredEntity('delete user');

    await this.database.users.delete(id, deleted);
    return deleted;
  }

  async findAll(): Promise<User[]> {
    return await this.database.users.findMany();
  }

  async findById(id: string): Promise<User> {
    if (!validate(id)) throw new InvalidID('get user');

    const founded: User | null = await this.database.users.findOne({ key: 'id', equals: id });

    if (!founded) throw new NoRequiredEntity('get user');

    return founded;
  }
}
