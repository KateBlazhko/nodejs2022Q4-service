import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [TypeOrmModule.forFeature([Token])],
})
export class TokenModule {}
