import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidID } from 'src/errors/InvalidID.error';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CreateTokentDTO } from './dto/create-token.dto';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(createDTO: CreateTokentDTO): Promise<Token> {
    const founded = await this.findByUserId(createDTO.userId);

    if (founded) {
      return await this.tokenRepository.save({ ...founded, refreshToken: createDTO.refreshToken });
    }

    const created = this.tokenRepository.create(createDTO);
    return await this.tokenRepository.save(created);
  }

  async findByUserId(userId: string): Promise<Token> {
    if (!validate(userId)) throw new InvalidID('get album');

    const founded: Token | null = await this.tokenRepository.findOneBy({ userId });

    return founded;
  }
}
