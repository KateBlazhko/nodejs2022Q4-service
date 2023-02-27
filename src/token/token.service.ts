import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokentDTO } from './dto/refresh-token.dto';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(createDTO: RefreshTokentDTO): Promise<Token> {
    const created = this.tokenRepository.create(createDTO);

    return await this.tokenRepository.save(created);
  }
}
