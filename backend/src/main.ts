import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // para añadir información en logs y feedback de porqué se falla

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS permitiendo solo el origen de Angular
  app.enableCors({
    origin: process.env.FRONTEND_URL,// par
    
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están definidas en el DTO
      forbidNonWhitelisted: true, // arroja un error si se envían propiedades extra
      transform: true, // convierte los datos de entrada al tipo esperado
    }),
  );
  
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
