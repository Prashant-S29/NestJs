import { transports, format, LoggerOptions } from 'winston';

export const winstonConfig: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
};
  