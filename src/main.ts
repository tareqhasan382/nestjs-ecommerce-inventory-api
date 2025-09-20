import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Inventory API')
    .setDescription('API documentation for inventory management')
    .setVersion('1.0')
    .addBearerAuth() // for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // error on extra fields
      transform: true, // transform types (e.g. strings to numbers)
    }),
  );


  await app.listen(process.env.PORT || 5000);
}
bootstrap();
