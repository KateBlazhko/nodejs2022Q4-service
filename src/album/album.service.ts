import { Injectable } from '@nestjs/common';
// import { DatabaseService } from 'src/database/database.service';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
// import { TrackService } from 'src/track/track.service';
import { v4, validate } from 'uuid';
import { ChangeAlbumDTO } from './dto/change-album.dto';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
// import { Album } from './interfaces/album.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>, // private database: DatabaseService, // private trackService: TrackService,
  ) {}

  async create(createDTO: CreateAlbumDTO): Promise<AlbumEntity> {
    const created = this.albumsRepository.create(createDTO);

    return await this.albumsRepository.save(created);
  }

  async change(id: string, changeDTO: ChangeAlbumDTO): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('change album');

    const album: AlbumEntity | null = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NoRequiredEntity('change album');

    return await this.albumsRepository.save({
      ...album,
      ...changeDTO,
    });
  }

  async delete(id: string): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('delete album');

    const deleted: AlbumEntity | null = await this.albumsRepository.findOneBy({ id });

    if (!deleted) throw new NoRequiredEntity('delete album');

    // const tracks = await this.database.tracks.findMany({ key: 'albumId', equals: id });
    // await Promise.all(
    //   tracks.map(async (track) => await this.trackService.change(track.id, { albumId: null })),
    // );

    // await this.database.favorites.delete(id, 'albums');

    return await this.albumsRepository.remove(deleted);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumsRepository.find();
  }

  async findById(id: string): Promise<AlbumEntity> {
    if (!validate(id)) throw new InvalidID('get album');

    const founded: AlbumEntity | null = await this.albumsRepository.findOneBy({ id });

    if (!founded) throw new NoRequiredEntity('get album');

    return founded;
  }
}
