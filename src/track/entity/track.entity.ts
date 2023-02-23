import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';

@Injectable()
@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { cascade: true, onDelete: 'SET NULL' })
  artist: Artist | null;

  @Column({ nullable: true })
  @RelationId((track: Track) => track.artist)
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, { cascade: true, onDelete: 'SET NULL' })
  album: Album | null;

  @Column({ nullable: true })
  @RelationId((track: Track) => track.album)
  albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
