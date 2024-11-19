import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, LoggerService],
})
export class UsersModule {}
