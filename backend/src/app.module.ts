import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoardModule } from './modules/board/board.module.js';

import { ApplicationErrorFilter } from '#core/presentation/rest/filters/application-error.filter.js';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './infrastructure/metrics/index.js';

@Module({
    imports: [
        PrometheusModule.register({
            path: '/metrics',
        }),
        MetricsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        PrismaModule.forRoot({
            isGlobal: true,
        }),
        BoardModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ApplicationErrorFilter,
        },
    ],
})
export class AppModule {}
