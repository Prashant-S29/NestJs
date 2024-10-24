import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { EmployeesModule } from './employees/employees.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    PrismaDbModule,
    EmployeesModule,

    // using the throttler module this way will apply rate limiting to all routes
    // you can use @SkipThrottler() to the routes where you want to skip the rate limiting
    // or you can use @Throttler() to the routes where you want to apply rate limiting (ref: employees.controller.ts)
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 4,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 30,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
