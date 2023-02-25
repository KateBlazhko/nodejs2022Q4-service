import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { CustomLogger } from './logger.service';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
  imports: [StorageModule],
})
export class LoggerModule {}
