import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: { origin: true, credentials: true } });
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.getHttpAdapter().get('/', (_request, response) => {
    response.status(200).json({
      name: 'Secure Attendance API',
      status: 'ok',
      message: 'API is running. Use /api/v1 for application routes.',
      routes: ['/api/v1/auth', '/api/v1/attendance', '/api/v1/analytics', '/api/v1/notifications'],
    });
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidUnknownValues: true }));

  const port = Number(process.env['PORT'] ?? 4000);
  await app.listen(port);
}

void bootstrap();
