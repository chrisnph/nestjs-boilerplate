import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { CaptureConsole } from '@sentry/integrations';
import { init, startTransaction, captureException } from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';

config({ path: `${process.cwd()}/environments/.env` });

// @ts-ignore
const Tracing = require('@sentry/tracing');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
};

init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new CaptureConsole({
      levels: ['error'],
    }),
  ],
  tracesSampleRate: 1.0,
});

const transaction = startTransaction({
  op: 'NestJS Boilerplate V1',
  name: 'NestJS Boilerplate V1 - main',
});

setTimeout(() => {
  try {
    bootstrap();
  } catch (error) {
    // console.error(`${__filename.split('/').splice(-1)} - ${error.message}`);
    captureException(error);
  } finally {
    transaction.finish();
  }
}, 1);
