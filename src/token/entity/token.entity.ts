import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId } from 'typeorm';

@Entity()
@Injectable()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.refreshToken, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column()
  @RelationId((token: Token) => token.user)
  userId: string;

  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }
}
