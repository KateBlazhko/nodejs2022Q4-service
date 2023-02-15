import { Injectable } from '@nestjs/common';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { TrackEntity } from 'src/track/entity/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@Injectable()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;
  // artistId: string | null;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
