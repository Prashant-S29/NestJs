import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Request, Response } from 'express';
// import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { GlobalExceptionFilterType } from 'types/global-exception-filter.type';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let responseBody: GlobalExceptionFilterType;

    if (exception instanceof HttpException) {
      responseBody = {
        statusCode: exception.getStatus(),
        message: exception.message,
        path: request.url,
        response: exception.getResponse(),
      };
      // } else if (exception instanceof PrismaClientValidationError) {
      //   responseBody = {
      //     statusCode: HttpStatus.BAD_REQUEST,
      //     message: exception.message.replaceAll(/\n/g, ''),
      //     path: request.url,
      //     response: exception.stack || {},
      //   };
    } else {
      responseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        path: request.url,
        response: exception.stack,
      };
    }

    response.status(responseBody.statusCode).json(responseBody);

    this.logger.error(responseBody.message, GlobalExceptionFilter.name);

    super.catch(exception, host);
  }
}
