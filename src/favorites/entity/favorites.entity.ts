import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeEntity {
  album = 'album',
  artist = 'artist',
  track = 'track',
}

@Injectable()
@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TypeEntity })
  typeEntity: keyof TypeEntity;

  @Column({ type: 'uuid' })
  identity: string;

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
