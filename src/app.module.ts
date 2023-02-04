import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AlbumModule, UserModule, TrackModule, ArtistModule, FavoritesModule, DatabaseModule],
})
export class AppModule {}
