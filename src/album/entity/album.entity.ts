import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, RelationId } from 'typeorm';

@Entity()
@Injectable()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { cascade: true, onDelete: 'SET NULL' })
  artist: Artist | null;

  @Column({ nullable: true })
  @RelationId((album: Album) => album.artist)
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
