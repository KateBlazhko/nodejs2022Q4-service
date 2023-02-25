import { Injectable, Scope, LoggerService } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('Custom logger', message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error('Custom logger error', message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn('Custom logger warn', message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
