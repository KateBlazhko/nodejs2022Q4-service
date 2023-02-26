import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/logger.module';
import configService from './ormconfig';
import { LoggerMiddleware } from './logger/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CommonExceptionFilter } from './errors/CommonExceptionFilter';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CommonExceptionFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `../.env`,
    }),
    TypeOrmModule.forRoot(configService),
    AlbumModule,
    UserModule,
    TrackModule,
    ArtistModule,
    FavoritesModule,
    LoggerModule,
    StorageModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
