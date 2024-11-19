import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService();
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      // 'finish' is more suitable for logging after response is sent
      const resTime = new Date().getTime();
      const { statusCode } = res;
      const timeTaken = resTime - reqTime;

      if (statusCode >= 200 && statusCode < 300) {
        // Success responses (2xx)
        this.logger.log(`${method} ${url} ${statusCode} ${timeTaken}ms`);
      } else if (statusCode >= 400 && statusCode < 500) {
        // Client error responses (4xx)
        this.logger.warn(`${method} ${url} ${statusCode} ${timeTaken}ms`);
      } else if (statusCode >= 500) {
        // Server error responses (5xx)
        this.logger.error(`${method} ${url} ${statusCode} ${timeTaken}ms`);
      } else {
        // Other responses (e.g., 3xx for redirection)
        this.logger.log(`${method} ${url} ${statusCode} ${timeTaken}ms`);
      }
    });

    next();
  }
}
