import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { CustomLogger } from 'src/logger/logger.service';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CustomLogger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const httpMessage =
      exception instanceof HttpException ? exception.message : 'INTERNAL_SERVER_ERROR';

    const { method, originalUrl } = request;
    const message = `${method} ${originalUrl} ${httpStatus} ${httpMessage ? httpMessage : ''}`;

    if (httpStatus >= 500) {
      this.logger.error(message);
    } else {
      this.logger.warn(message);
    }

    // process.on('uncaughtException', (error) => {
    //   this.logger.error(`captured error: ${error.message}`);
    //   process.exit(1);
    // });

    // process.on('unhandledRejection', (reason) => {
    //   if (reason instanceof Error)
    //     this.logger.error(`Unhandled rejection detected: ${reason.message}`);
    // });

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
