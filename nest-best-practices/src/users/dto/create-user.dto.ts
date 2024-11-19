import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Invalid Email',
    },
  )
  email: string;

  @IsString()
  @Length(10, 10, {
    message: '10 Digits phone number is required',
  })
  phone: string;

  @IsNotEmpty({
    message: 'Age is required',
  })
  @IsNumber(
    {},
    {
      message: 'Only numbers are allowed',
    },
  )
  @Min(1, {
    message: 'Age must be at least 1',
  })
  @Max(100, {
    message: 'Age must not exceed 120',
  })
  age: number;
}
