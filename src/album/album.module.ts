import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entity/album.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [
    TrackModule,
    TypeOrmModule.forFeature([Album]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
    }),
  ],
})
export class AlbumModule {}
