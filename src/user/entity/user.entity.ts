import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';

@Injectable()
export class UserEntity {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
