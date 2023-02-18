import { Injectable } from '@nestjs/common';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { ChangeArtistDTO } from './dto/change-artist.dto';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { Artist } from './entity/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createDTO: CreateArtistDTO): Promise<Artist> {
    const created = this.artistRepository.create(createDTO);

    return await this.artistRepository.save(created);
  }

  async change(id: string, changeDTO: ChangeArtistDTO): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('change artist');

    const artist: Artist | null = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new NoRequiredEntity('change artist');

    return await this.artistRepository.save({
      ...artist,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('delete artist');

    const deleted: Artist | null = await this.artistRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete artist');

    await this.artistRepository.remove(deleted);
    return deleted;
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findById(id: string): Promise<Artist> {
    if (!validate(id)) throw new InvalidID('get artist');

    const founded: Artist | null = await this.artistRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get artist');

    return founded;
  }
}
