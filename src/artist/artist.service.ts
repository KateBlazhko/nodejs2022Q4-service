import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4, validate } from 'uuid';
import { ChangeArtistDTO } from './dto/change-artist.dto';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  async create(createDTO: CreateArtistDTO): Promise<Artist> {
    const created = await this.database.artists.create({
      ...createDTO,
      id: v4(),
    });

    return created;
  }

  async change(id: string, changeDTO: ChangeArtistDTO): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('change artist');

    const artist: Artist | null = await this.database.artists.findOne({ key: 'id', equals: id });

    if (!artist) throw new NoRequiredEntity('change artist');

    return await this.database.artists.change(id, {
      ...artist,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('delete artist');

    const deleted: Artist | null = await this.database.artists.findOne({ key: 'id', equals: id });

    if (!deleted) throw new NoRequiredEntity('delete artist');

    await this.database.artists.delete(id, deleted);
    return deleted;
  }

  async findAll(): Promise<Artist[]> {
    return await this.database.artists.findMany();
  }

  async findById(id: string): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('get artist');

    const founded: Artist | null = await this.database.artists.findOne({ key: 'id', equals: id });

    if (!founded) throw new NoRequiredEntity('get artist');

    return founded;
  }
}
