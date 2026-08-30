import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoardModule } from './modules/board/board.module.js';

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
    providers: [AppService],
})
export class AppModule {}
