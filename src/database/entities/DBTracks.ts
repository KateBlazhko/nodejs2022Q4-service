import { Track } from 'src/track/interfaces/track.interface';
import DBEntity from './DBEntity';

export type CreateTrackDTO = Omit<Track, 'id'>;
export type ChangeTrackDTO = Partial<Omit<Track, 'id'>>;

export default class DBTracks extends DBEntity<Track> {}
