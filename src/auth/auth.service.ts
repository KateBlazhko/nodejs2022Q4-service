import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExist } from 'src/errors/UserAlreadyExist.error';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokentDTO } from './dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { InvalidAuth } from 'src/errors/InvalidAuth.error';

type TokenType = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(private userSevice: UserService, private jwtService: JwtService) {}

  async login(userDTO: CreateUserDTO): Promise<TokenType> {
    const user = await this.validateUser(userDTO);

    return this.generateToken(user);
  }

  async signup({ login, password }: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const founded = await this.userSevice.findByLogin(login);

    if (founded) throw new UserAlreadyExist('signup user');

    const hashPassword = await bcrypt.hash(password, process.env.CRYPT_SALT);
    return await this.userSevice.create({ login, password: hashPassword });
  }

  async refresh(refreshDTO: RefreshTokentDTO) {}

  private generateToken({ id, login }: Omit<User, 'password'>): TokenType {
    const payload = { id, login };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '12h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '60h' }),
    };
  }

  private async validateUser({ login, password }: CreateUserDTO): Promise<User> {
    const founded = await this.userSevice.findByLogin(login);

    if (!founded) throw new InvalidAuth('login user');

    const isRightPassword = await bcrypt.compare(founded.password, password);

    if (isRightPassword) {
      return founded;
    }

    throw new InvalidAuth('login user');
  }
}
