import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
  
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    
    const port = 3010
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();