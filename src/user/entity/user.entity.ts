import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
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
