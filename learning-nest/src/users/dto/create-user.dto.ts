import { UserRole } from 'types/database';
import { PartialType } from '@nestjs/mapped-types';

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Create User DTO Schema
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'engineer', 'intern'], {
    message: 'Invalid role. Please provide a valid role.',
  })
  role: UserRole;
}