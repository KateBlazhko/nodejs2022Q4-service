import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { TrackService } from 'src/track/track.service';
import { v4, validate } from 'uuid';
import { ChangeAlbumDTO } from './dto/change-album.dto';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
// import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService, private trackService: TrackService) {}

  async create(createDTO: CreateAlbumDTO): Promise<AlbumEntity> {
    return await this.database.albums.create({
      ...createDTO,
      id: v4(),
    });
  }

  async change(id: string, changeDTO: ChangeAlbumDTO): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('change album');

    const album: AlbumEntity | null = await this.database.albums.findOne({ key: 'id', equals: id });

    if (!album) throw new NoRequiredEntity('change album');

    return await this.database.albums.change(id, {
      ...album,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('delete album');

    const deleted: AlbumEntity | null = await this.database.albums.findOne({
      key: 'id',
      equals: id,
    });

    if (!deleted) throw new NoRequiredEntity('delete album');

    const tracks = await this.database.tracks.findMany({ key: 'albumId', equals: id });
    await Promise.all(
      tracks.map(async (track) => await this.trackService.change(track.id, { albumId: null })),
    );

    await this.database.favorites.delete(id, 'albums');

    return await this.database.albums.delete(id, deleted);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.database.albums.findMany();
  }

  async findById(id: string): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('get album');

    const founded: AlbumEntity | null = await this.database.albums.findOne({
      key: 'id',
      equals: id,
    });

    if (!founded) throw new NoRequiredEntity('get album');

    return founded;
  }
}
