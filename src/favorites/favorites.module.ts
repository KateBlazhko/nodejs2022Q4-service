import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entity/favorites.entity';
import { Track } from 'src/track/entity/track.entity';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
  ],
})
export class FavoritesModule {}
