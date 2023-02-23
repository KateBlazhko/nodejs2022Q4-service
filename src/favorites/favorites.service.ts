import { Injectable } from '@nestjs/common';
import { FavoritesDTO } from './interfaces/favs.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites, TypeEntity } from './entity/favorites.entity';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';
import { validate } from 'uuid';
import { InvalidID } from 'src/errors/InvalidID.error';
import { InvalidType } from 'src/errors/InvalidType.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';

const TypeEntityObject = {
  album: '',
  track: '',
  artist: '',
};

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favsRepository: Repository<Favorites>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<FavoritesDTO> {
    const favsAlbums = await this.albumRepository
      .createQueryBuilder('album')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('favorite.idEntity')
          .from(Favorites, 'favorite')
          .where('favorite.typeEntity = :type')
          .getQuery();
        return 'album.id IN ' + subQuery;
      })
      .setParameter('type', 'album')
      .getMany();

    const favsArtists = await this.artistRepository
      .createQueryBuilder('artist')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('favorite.idEntity')
          .from(Favorites, 'favorite')
          .where('favorite.typeEntity = :type')
          .getQuery();
        return 'artist.id IN ' + subQuery;
      })
      .setParameter('type', 'artist')
      .getMany();

    const favsTracks = await this.trackRepository
      .createQueryBuilder('track')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('favorite.idEntity')
          .from(Favorites, 'favorite')
          .where('favorite.typeEntity = :type')
          .getQuery();
        return 'track.id IN ' + subQuery;
      })
      .setParameter('type', 'track')
      .getMany();

    return {
      albums: favsAlbums,
      artists: favsArtists,
      tracks: favsTracks,
    };
  }

  async add(idEntity: string, typeEntity: TypeEntity) {
    if (!validate(idEntity)) throw new InvalidID('add favs');

    const founded = await this[`${typeEntity}Repository`].findOneBy({ id: idEntity });

    if (!founded) throw new NoRequiredEntity('get favs');

    if (!Object.keys(TypeEntityObject).includes(typeEntity)) throw new InvalidType('add favs');

    const favorite = this.favsRepository.create({
      typeEntity,
      idEntity,
    });
    await this.favsRepository.save(favorite);
  }

  async delete(idEntity: string, typeEntity: TypeEntity) {
    if (!validate(idEntity)) throw new InvalidID('delete favs');

    if (!Object.keys(TypeEntityObject).includes(typeEntity)) throw new InvalidType('add favs');

    const founded = await this.favsRepository.find({
      where: {
        idEntity,
        typeEntity,
      },
    });

    if (!founded) throw new NoRequiredEntity('get favs');

    await this.favsRepository.remove(founded);
  }
}
