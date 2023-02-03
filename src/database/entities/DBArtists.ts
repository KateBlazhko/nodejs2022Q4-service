import { Artist } from 'src/artist/interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type CreateArtistDTO = Omit<Artist, 'id'>;
export type ChangeArtistDTO = Partial<Omit<Artist, 'id'>>;

export default class DBArtists extends DBEntity<
  Artist,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  async create(dto: CreateArtistDTO) {
    const created: Artist = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
