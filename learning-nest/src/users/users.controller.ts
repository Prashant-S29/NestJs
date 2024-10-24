import { Body, Controller, Delete, Get, Param, Post, Query, ParseIntPipe, Patch, ValidationPipe } from '@nestjs/common';

// services
import { UsersService } from './users.service';

// types
import { UserRole } from 'types/database';

// DTO Schema
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // get all users
  @Get()
  findAll(@Query('role') role?: UserRole) {
    return this.userService.findAll(role);
  }

  // create a new user
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // update a user
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // delete a user
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  // get user by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
}
