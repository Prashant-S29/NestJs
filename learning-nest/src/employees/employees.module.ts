import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

// Prisma
import { PrismaDbModule } from 'src/prisma_db/prisma_db.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [PrismaDbModule],
})
export class EmployeesModule {}
