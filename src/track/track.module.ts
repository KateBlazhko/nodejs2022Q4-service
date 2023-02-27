import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entity/track.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [
    TypeOrmModule.forFeature([Track]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
    }),
  ],
})
export class TrackModule {}
