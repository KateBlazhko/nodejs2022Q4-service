import { Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './interfaces/track.interface';
import { ChangeTrackDTO } from './dto/change-track.dto';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  async create(createDTO: CreateTrackDTO): Promise<Track> {
    const nowDate = new Date();

    return await this.database.tracks.create({
      ...createDTO,
      id: v4(),
    });
  }

  async change(id: string, changeDTO: ChangeTrackDTO): Promise<Track> {
    if (!validate(id)) throw new InvalidID('update track');

    const track: Track | null = await this.database.tracks.findOne({ key: 'id', equals: id });

    if (!track) throw new NoRequiredEntity('update track');

    return await this.database.tracks.change(id, {
      ...track,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<Track> {
    if (!validate(id)) throw new InvalidID('delete track');

    const deleted: Track | null = await this.database.tracks.findOne({ key: 'id', equals: id });

    if (!deleted) throw new NoRequiredEntity('delete track');

    await this.database.tracks.delete(id, deleted);
    return deleted;
  }

  async findAll(): Promise<Track[]> {
    return await this.database.tracks.findMany();
  }

  async findById(id: string): Promise<Track> {
    if (!validate(id)) throw new InvalidID('get track');

    const founded: Track | null = await this.database.tracks.findOne({ key: 'id', equals: id });

    if (!founded) throw new NoRequiredEntity('get track');

    return founded;
  }
}
