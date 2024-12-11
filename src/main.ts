import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: 'http://127.0.0.1:5173', // Allowed origin (frontend application URL)
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'apollo-require-preflight',
    ], // Specify allowed headers for cross-origin requests
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
  });
  // Add cookie parsing middleware to parse incoming cookies
  app.use(cookieParser());

  // Configure global validation pipe for input validation
  // Applies validation to ALL incoming requests across the entire application
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow properties defined in the DTO
      transform: true, // Automatically transform input to match DTO types
      // Custom exception factory for validation errors
      exceptionFactory: (errors) => {
        const formatttedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formatttedErrors);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

// CORS (Cross-Origin Resource Sharing) configuration is crucial for web applications, especially when your frontend and backend are running on different domains or ports.
