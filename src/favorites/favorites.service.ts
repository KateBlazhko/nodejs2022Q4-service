import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DatabaseService } from 'src/database/database.service';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { FavoritesDTO } from './interfaces/favs.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private database: DatabaseService,
    private albums: AlbumService,
    private artists: ArtistService,
    private tracks: TrackService,
  ) {}

  async findAll(): Promise<FavoritesDTO> {
    const favsIDs = await this.database.favorites.findAll();

    const favsAlbums = await Promise.all(
      favsIDs.albums.map(async (id) => await this.albums.findById(id)),
    );
    const favsArtists = await Promise.all(
      favsIDs.artists.map(async (id) => await this.artists.findById(id)),
    );
    const favsTracks = await Promise.all(
      favsIDs.tracks.map(async (id) => await this.tracks.findById(id)),
    );

    return {
      albums: favsAlbums,
      artists: favsArtists,
      tracks: favsTracks,
    };
  }

  async add(id: string, type: keyof FavoritesDTO) {
    // try {
    await this[type].findById(id);

    this.database.favorites.add(id, type);
    // } catch (e: unknown) {
    //   if (e instanceof Error) throw e;
    // }
  }

  async delete(id: string, type: keyof FavoritesDTO) {
    // try {
    await this[type].findById(id);

    this.database.favorites.delete(id, type);
    // } catch (e: unknown) {
    //   if (e instanceof Error) throw e;
    // }
  }
}
