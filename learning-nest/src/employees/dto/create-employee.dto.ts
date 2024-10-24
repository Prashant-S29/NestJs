import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { EmployeeRoleEnum } from 'types/database';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(EmployeeRoleEnum, {
    message: 'Invalid role. Please provide a valid role.',
  })
  role: EmployeeRoleEnum;
}
