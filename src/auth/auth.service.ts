import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokentDTO } from '../token/dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { InvalidAuth } from 'src/errors/InvalidAuth.error';
import { TokenService } from 'src/token/token.service';

type TokenType = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userSevice: UserService,
    private tokenSevice: TokenService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: CreateUserDTO): Promise<TokenType> {
    const user = await this.validateUser(userDTO);

    return await this.generateToken(user.id, user.login);
  }

  async signup({ login, password }: CreateUserDTO): Promise<User> {
    const founded = await this.userSevice.findByLogin(login);

    // if (founded) throw new UserAlreadyExist('signup user');

    const hashPassword = await bcrypt.hash(password, Number(process.env.CRYPT_SALT));

    return await this.userSevice.create({ login, password: hashPassword });
  }

  async refresh({ refreshToken }: RefreshTokentDTO) {
    const payload = this.jwtService.verify(refreshToken);

    return await this.generateToken(payload.id, payload.login);
  }

  private async generateToken(id: string, login: string): Promise<TokenType> {
    const payload = { id, login };

    const tokens = {
      accessToken: this.jwtService.sign(payload, { expiresIn: process.env.TOKEN_EXPIRE_TIME }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };

    const token = await this.tokenSevice.create({ refreshToken: tokens.refreshToken, userId: id });
    await this.userSevice.updateToken(id, token.id);

    return tokens;
  }

  private async validateUser({ login, password }: CreateUserDTO): Promise<User> {
    const founded = await this.userSevice.findByLogin(login);

    if (!founded) throw new InvalidAuth('login user');

    const isRightPassword = await bcrypt.compare(password, founded.password);

    if (isRightPassword) {
      return founded;
    }

    throw new InvalidAuth('login user');
  }
}
