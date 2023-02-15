import { Injectable } from '@nestjs/common';
// import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from './dto/create-user.dto';
// import { User } from './interfaces/user.interface';
import { v4, validate } from 'uuid';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { WrongPassword } from '../errors/WrongPassword.error';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // private database: DatabaseService,
  ) {}

  async create(createDTO: CreateUserDTO): Promise<Omit<UserEntity, 'password'>> {
    const created = this.userRepository.create(new UserEntity(createDTO));

    await this.userRepository.save(created);
    return created;
  }

  async updatePassword(
    id: string,
    changeDTO: UpdatePasswordDTO,
  ): Promise<Omit<UserEntity, 'password'>> {
    if (!validate(id)) throw new InvalidID('update password');

    const user: UserEntity | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new NoRequiredEntity('update password');

    const nowDate = new Date();

    if (user.password !== changeDTO.oldPassword) throw new WrongPassword('update password');

    const changed = new UserEntity({
      ...user,
      password: changeDTO.newPassword,
    });

    await this.userRepository.save(changed);

    return changed;
  }

  async delete(id: string): Promise<UserEntity> {
    if (!validate(id)) throw new InvalidID('delete user');

    const deleted: UserEntity | null = await this.userRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete user');

    await this.userRepository.remove(deleted);
    return deleted;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    if (!validate(id)) throw new InvalidID('get user');

    const founded: UserEntity | null = await this.userRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get user');

    return founded;
  }
}
