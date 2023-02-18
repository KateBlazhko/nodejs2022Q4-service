import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './entity/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [TrackModule, AlbumModule, TypeOrmModule.forFeature([Artist])],
})
export class ArtistModule {}
