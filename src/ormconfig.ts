import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Album } from './album/entity/album.entity';
import { Artist } from './artist/entity/artist.entity';
import { Track } from './track/entity/track.entity';

const configService: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Album, Artist, Track],
  autoLoadEntities: true,
  // migrations: ['**/migration/*.js'],
  synchronize: true,
};

export default configService;
