import { Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
// import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDTO } from './dto/create-track.dto';
// import { Track } from './interfaces/track.interface';
import { ChangeTrackDTO } from './dto/change-track.dto';
import { TrackEntity } from './entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>, // private database: DatabaseService,
  ) {}

  async create(createDTO: CreateTrackDTO): Promise<TrackEntity> {
    const created = this.trackRepository.create(createDTO);

    return await this.trackRepository.save(created);
  }

  async change(id: string, changeDTO: ChangeTrackDTO): Promise<TrackEntity> {
    if (!validate(id)) throw new InvalidID('update track');

    const track: TrackEntity | null = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NoRequiredEntity('update track');

    return await this.trackRepository.save({
      ...track,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<TrackEntity> {
    if (!validate(id)) throw new InvalidID('delete track');

    const deleted: TrackEntity | null = await this.trackRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete track');

    // await this.database.favorites.delete(id, 'tracks');

    await this.trackRepository.remove(deleted);
    return deleted;
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findById(id: string): Promise<TrackEntity> {
    if (!validate(id)) throw new InvalidID('get track');

    const founded: TrackEntity | null = await this.trackRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get track');

    return founded;
  }
}
