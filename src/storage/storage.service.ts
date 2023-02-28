import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable } from '@nestjs/common';
import { stat, appendFile } from 'fs/promises';

import { join } from 'path';

@Injectable()
export class StorageService {
  public log = 0;
  public error = 0;

  async recordData(message: string, type: 'log' | 'error') {
    const pathToFile = join(process.cwd(), 'src', 'logs', `${type}-${this[type]}.txt`);
    await appendFile(pathToFile, message + '\n');

    if (await this.isOverMaxSize(pathToFile)) {
      this[type] = this[type] + 1;
    }
  }

  async isOverMaxSize(pathToFile: string): Promise<boolean> {
    const statFile = await stat(pathToFile);
    return statFile.size >= Number(process.env.MAX_LOG_FILE);
  }
}
