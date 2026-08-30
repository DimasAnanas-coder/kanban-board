import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap(): Promise<undefined> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const port = 3010;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
