import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Token } from 'src/token/entity/token.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

@Injectable()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(
    () => Token,
    (token) => {
      token.user;
    },
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  refreshToken: Token | null;

  @Column({ nullable: true, default: null })
  @RelationId((user: User) => user.refreshToken)
  refreshTokenId: string | null;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    transformer: {
      from: (date: Date) => date.getTime(),
      to: (date: number) => date,
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      from: (date: Date) => date.getTime(),
      to: (date: number) => date,
    },
  })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
