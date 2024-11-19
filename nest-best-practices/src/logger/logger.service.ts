import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Logger, createLogger } from 'winston';
import { winstonConfig } from 'winston.config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logger: Logger;

  constructor() {
    super();
    this.logger = createLogger(winstonConfig);
  }

  // log
  log(message: string): void {
    this.logger.log({
      level: 'info',
      message,
    });
  }

  // error
  error(message: string): void {
    this.logger.log({
      level: 'error',
      message,
    });
  }

  // warn
  warn(message: string): void {
    this.logger.log({
      level: 'warn',
      message,
    });
  }

  // debug
  debug(message: string): void {
    this.logger.log({
      level: 'debug',
      message,
    });
  }

  // verbose
  verbose(message: string): void {
    this.logger.log({
      level: 'verbose',
      message,
    });
  }
}
