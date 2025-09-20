import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from 'serverless-http';


let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp);
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};