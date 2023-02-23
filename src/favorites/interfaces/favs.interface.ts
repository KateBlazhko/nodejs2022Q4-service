// import { Album } from 'src/album/interfaces/album.interface';
// import { Artist } from 'src/artist/interfaces/artist.interface';
// import { Track } from 'src/track/interfaces/track.interface';

import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesDTO {
  artists: Artist[]; // favorite artists
  albums: Album[]; // favorite albums
  tracks: Track[]; // favorite tracks
}
