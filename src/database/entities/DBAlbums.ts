import { Album } from 'src/album/interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type CreateAlbumDTO = Omit<Album, 'id'>;
export type ChangeAlbumDTO = Partial<Omit<Album, 'id'>>;

export default class DBAlbums extends DBEntity<
  Album,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  async create(dto: CreateAlbumDTO) {
    const created: Album = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
