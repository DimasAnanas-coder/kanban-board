import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";


export class PrismaRepository {
    prisma: PrismaService;
    tx: Prisma.TransactionClient | null;

    constructor(
        prisma: PrismaService
    ) {
        this.tx = null;
        this.prisma = prisma;
    }

    get service(): Prisma.TransactionClient | PrismaService{
        if (!this.tx) {
            return this.prisma;
        }
        return this.tx;
    }

};