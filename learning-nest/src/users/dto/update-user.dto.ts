import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Update User DTO Schema
export class UpdateUserDto extends PartialType(CreateUserDto) {}
