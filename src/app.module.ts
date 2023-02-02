import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [AlbumModule, UserModule, TrackModule, ArtistModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
