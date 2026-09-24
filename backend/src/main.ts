import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { corsConfig } from './infrastructure/config/cors.config.js';
import { MetricsInterceptor } from './infrastructure/metrics/index.js';

async function bootstrap(): Promise<undefined> {
    const app = await NestFactory.create(AppModule);
    
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        }),
    );

    app.useGlobalInterceptors(app.get(MetricsInterceptor));
    app.enableCors(corsConfig);

    const port = 3010;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
