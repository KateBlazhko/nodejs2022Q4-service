import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { validate } from 'uuid';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { WrongPassword } from '../errors/WrongPassword.error';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createDTO: CreateUserDTO): Promise<User> {
    const created = this.userRepository.create(new User(createDTO));

    return await this.userRepository.save(created);
  }

  async updatePassword(id: string, changeDTO: UpdatePasswordDTO): Promise<Omit<User, 'password'>> {
    if (!validate(id)) throw new InvalidID('update password');

    const user: User | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new NoRequiredEntity('update password');

    if (user.password !== changeDTO.oldPassword) throw new WrongPassword('update password');

    const changed = new User({
      ...user,
      password: changeDTO.newPassword,
    });

    await this.userRepository.save(changed);

    return changed;
  }

  async updateToken(id: string, refreshTokenId: string): Promise<Omit<User, 'password'>> {
    if (!validate(id)) throw new InvalidID('update password');

    const user: User | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new NoRequiredEntity('update password');

    const changed = new User({
      ...user,
      refreshTokenId,
    });

    await this.userRepository.save(changed);

    return changed;
  }

  async delete(id: string): Promise<User> {
    if (!validate(id)) throw new InvalidID('delete user');

    const deleted: User | null = await this.userRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete user');

    await this.userRepository.remove(deleted);
    return deleted;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    if (!validate(id)) throw new InvalidID('get user');

    const founded: User | null = await this.userRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get user');

    return founded;
  }

  async findByLogin(login: string): Promise<User | null> {
    const founded: User | null = await this.userRepository.findOneBy({ login });

    return founded;
  }
}
