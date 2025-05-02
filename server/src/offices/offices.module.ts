import { Module } from "@nestjs/common"
import { OfficesService } from "./offices.service"
import { OfficesController } from "./offices.controller"
import { PrismaService } from "src/prisma.service"

@Module({
	controllers: [OfficesController],
	providers: [OfficesService, PrismaService],
})
export class OfficesModule {}
