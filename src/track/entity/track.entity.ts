import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Injectable()
@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;
  // artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;
  // albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
