import { Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
// import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDTO } from './dto/create-track.dto';
// import { Track } from './interfaces/track.interface';
import { ChangeTrackDTO } from './dto/change-track.dto';
import { Track } from './entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>, // private database: DatabaseService,
  ) {}

  async create(createDTO: CreateTrackDTO): Promise<Track> {
    const created = this.trackRepository.create(createDTO);

    return await this.trackRepository.save(created);
  }

  async change(id: string, changeDTO: ChangeTrackDTO): Promise<Track> {
    if (!validate(id)) throw new InvalidID('update track');

    const track: Track | null = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NoRequiredEntity('update track');

    return await this.trackRepository.save({
      ...track,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<Track> {
    if (!validate(id)) throw new InvalidID('delete track');

    const deleted: Track | null = await this.trackRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete track');

    // await this.database.favorites.delete(id, 'tracks');

    await this.trackRepository.remove(deleted);
    return deleted;
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findById(id: string): Promise<Track> {
    if (!validate(id)) throw new InvalidID('get track');

    const founded: Track | null = await this.trackRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get track');

    return founded;
  }
}
