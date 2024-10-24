import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from 'config/cors.config';

import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  // cors configuration
  app.enableCors(corsConfig);

  // This change the default prefix from / from /api
  // so all the routes are accessible from /api/<routes> (/api/users, /api/employees)
  app.setGlobalPrefix('api');

  // Port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
