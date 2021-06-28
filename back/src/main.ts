import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import path from 'path';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Shop Nest API')
    .setDescription('쇼핑몰 개발을 위한 nest API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.enableCors({
      origin: 'http://calinode.com',
      credentials: true,
    });
  } else {
    app.use(morgan('dev'));
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }
  app.useStaticAssets('uploads');
  app.use(cookieParser());
  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.calinode.com'
      },
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  await app.listen(port);
  console.log(`Listening on port `);
  console.log(`ENVIRONMENT ${process.env.NODE_ENV}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
