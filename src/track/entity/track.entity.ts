import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/album/entity/album.entity';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Injectable()
@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;
  // artistId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity | null;
  // albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
