import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;
    this.logger.log(
      `Request ${method} ${originalUrl} ${JSON.stringify(body)} ${JSON.stringify(query)}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 200 && statusCode < 400) {
        this.logger.log(`Response ${method} ${originalUrl} ${statusCode}`);
      }
    });
    next();
  }
}
