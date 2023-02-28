import { Injectable, Scope, LoggerService } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { StorageService } from 'src/storage/storage.service';
import loggerLevels from './constants/level.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  constructor(private storage: StorageService) {}

  async log(message: string) {
    if (loggerLevels.log <= Number(process.env.MAX_LOG_LEVEL)) {
      console.log('Custom logger', message);
      await this.storage.recordData(message, 'log');
    }
  }

  async error(message: string) {
    if (loggerLevels.error <= Number(process.env.MAX_LOG_LEVEL)) {
      console.error('Custom logger error', message);
      await this.storage.recordData(message, 'error');
    }
  }

  async warn(message: string) {
    if (loggerLevels.warn <= Number(process.env.MAX_LOG_LEVEL)) {
      console.warn('Custom logger warn', message);
      await this.storage.recordData(message, 'log');
    }
  }

  async debug?(message: any, ...optionalParams: any[]) {
    if (loggerLevels.debug <= Number(process.env.MAX_LOG_LEVEL)) {
      console.debug(message);
      await this.storage.recordData(message, 'log');
    }
  }

  async verbose?(message: any, ...optionalParams: any[]) {
    if (loggerLevels.verbose <= Number(process.env.MAX_LOG_LEVEL)) {
      console.log(message);
      await this.storage.recordData(message, 'log');
    }
  }
}
