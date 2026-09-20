import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoardModule } from './modules/board/board.module.js';

import { ApplicationErrorFilter } from '#core/presentation/rest/filters/application-error.filter.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            // isGlobal: true — делает ConfigService доступным без импорта в другие модули
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
