import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  // Using DTO Schemas to define the request body

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('/api/user: post endpoint called');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // this.logger.log('/api/user: get all endpoint called');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // this.logger.log('/api/user: get user by id endpoint called');
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // this.logger.log('/api/user: update user by id endpoint called');
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // this.logger.log('/api/user: delete user by id endpoint called');
    return this.usersService.remove(+id);
  }
}
