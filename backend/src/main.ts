import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './presentation/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('API REST para gestión de gastos personales - Prueba Técnica')
    .setVersion('1.0')
    .addTag('expenses', 'Operaciones CRUD de gastos')
    .addTag('reports', 'Generación de reportes')
    .addTag('charts', 'Estadísticas y gráficas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Gestor de Gastos - API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });
  
  app.enableCors({ 
    origin: [
      //'*',
      'http://localhost:3000',
      'https://prueba-tecnica-prod.vercel.app',
      'https://api.eehcx.life'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false
  });
  
  // Validador global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,         
    forbidNonWhitelisted: true, 
    transform: true,           
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // filtro
  app.useGlobalFilters(new AllExceptionsFilter());
  
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0'); 
}
bootstrap();
