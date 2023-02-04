import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { v4, validate } from 'uuid';
import { ChangeAlbumDTO } from './dto/change-album.dto';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}

  async create(createDTO: CreateAlbumDTO): Promise<Album> {
    return await this.database.albums.create({
      ...createDTO,
      id: v4(),
    });
  }

  async change(id: string, changeDTO: ChangeAlbumDTO): Promise<Album> {
    if (!validate(id)) throw new InvalidID('change album');

    const album: Album | null = await this.database.albums.findOne({ key: 'id', equals: id });

    if (!album) throw new NoRequiredEntity('change album');

    return await this.database.albums.change(id, {
      ...album,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<Album> {
    if (!validate(id)) throw new InvalidID('delete album');

    const deleted: Album | null = await this.database.albums.findOne({ key: 'id', equals: id });

    if (!deleted) throw new NoRequiredEntity('delete album');

    return await this.database.albums.delete(id, deleted);
  }

  async findAll(): Promise<Album[]> {
    return await this.database.albums.findMany();
  }

  async findById(id: string): Promise<Album> {
    if (!validate(id)) throw new InvalidID('get album');

    const founded: Album | null = await this.database.albums.findOne({ key: 'id', equals: id });

    if (!founded) throw new NoRequiredEntity('get album');

    return founded;
  }
}
