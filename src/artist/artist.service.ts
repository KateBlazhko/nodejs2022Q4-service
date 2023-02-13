import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
// import { Artist } from './interfaces/artist.interface';
import { v4, validate } from 'uuid';
import { ChangeArtistDTO } from './dto/change-artist.dto';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    private database: DatabaseService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  async create(createDTO: CreateArtistDTO): Promise<ArtistEntity> {
    const created = await this.database.artists.create({
      ...createDTO,
      id: v4(),
    });

    return created;
  }

  async change(id: string, changeDTO: ChangeArtistDTO): Promise<ArtistEntity> {
    if (!validate(id)) throw new InvalidID('change artist');

    const artist: ArtistEntity | null = await this.database.artists.findOne({
      key: 'id',
      equals: id,
    });

    if (!artist) throw new NoRequiredEntity('change artist');

    return await this.database.artists.change(id, {
      ...artist,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<ArtistEntity> {
    if (!validate(id)) throw new InvalidID('delete artist');

    const deleted: ArtistEntity | null = await this.database.artists.findOne({
      key: 'id',
      equals: id,
    });

    if (!deleted) throw new NoRequiredEntity('delete artist');

    const tracks = await this.database.tracks.findMany({ key: 'artistId', equals: id });
    await Promise.all(
      tracks.map(async (track) => await this.trackService.change(track.id, { artistId: null })),
    );

    const albums = await this.database.albums.findMany({ key: 'artistId', equals: id });
    await Promise.all(
      albums.map(async (album) => await this.albumService.change(album.id, { artistId: null })),
    );

    await this.database.favorites.delete(id, 'artists');

    await this.database.artists.delete(id, deleted);
    return deleted;
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.database.artists.findMany();
  }

  async findById(id: string): Promise<ArtistEntity> {
    if (!validate(id)) throw new InvalidID('get artist');

    const founded: ArtistEntity | null = await this.database.artists.findOne({
      key: 'id',
      equals: id,
    });

    if (!founded) throw new NoRequiredEntity('get artist');

    return founded;
  }
}
