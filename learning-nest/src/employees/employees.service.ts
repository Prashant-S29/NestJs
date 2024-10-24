import { Injectable } from '@nestjs/common';

// Prisma
import { Prisma } from '@prisma/client';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

// Types
import { EmployeeRoleEnum } from 'types/database';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaDbService: PrismaDbService) {}

  // create new employee
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.prismaDbService.employee.create({
      data: createEmployeeDto,
      select: {
        id: true,
      },
    });
  }

  // get all employees
  async findAll(role: EmployeeRoleEnum) {
    if (!role) {
      return this.prismaDbService.employee.findMany();
    }

    // get all employee by role
    return this.prismaDbService.employee.findMany({
      where: {
        role: role,
      },
    });
  }

  // get all employee by id
  async findOne(id: number) {
    return this.prismaDbService.employee.findUnique({
      where: {
        id: id,
      },
    });
  }

  // update a employee
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.prismaDbService.employee.update({
      where: {
        id: id,
      },
      data: updateEmployeeDto,
    });
  }

  // delete a delete
  async delete(id: number) {
    return this.prismaDbService.employee.delete({
      where: {
        id: id,
      },
    });
  }
}
