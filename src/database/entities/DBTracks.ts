import { Track } from 'src/track/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import DBEntity from './DBEntity';

export type CreateTrackDTO = Omit<Track, 'id'>;
export type ChangeTrackDTO = Partial<Omit<Track, 'id'>>;

export default class DBTracks extends DBEntity<Track, ChangeTrackDTO, CreateTrackDTO> {
  async create(dto: CreateTrackDTO) {
    const created: Track = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
