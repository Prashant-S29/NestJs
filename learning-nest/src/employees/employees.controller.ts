import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';

// Types
import { EmployeeRoleEnum } from 'types/database';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { updateEmployeeDto } from './dto/update-employee.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('employees')
// rate limiting whole /api/employees route
@Throttle({
  short: {
    ttl: 1000,
    limit: 4,
  },
})

// you can specify the limit for certain methods also
// @Throttle({
//   short: {
//     ttl: 1000,
//     limit: 4,
//   },
// })
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role') role: EmployeeRoleEnum) {
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateEmployeeDto: updateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.delete(id);
  }
}
