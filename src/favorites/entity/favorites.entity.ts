import { Injectable } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TypeEntity = 'album' | 'artist' | 'track';

@Injectable()
@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  typeEntity: TypeEntity;

  @Column({ type: 'uuid' })
  idEntity: string;

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
