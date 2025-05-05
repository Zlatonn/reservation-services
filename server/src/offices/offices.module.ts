import { Module } from "@nestjs/common"
import { OfficesService } from "./offices.service"
import { OfficesController } from "./offices.controller"
import { PrismaService } from "src/prisma.service"
import { ServicesService } from "src/services/services.service"

@Module({
	controllers: [OfficesController],
	providers: [OfficesService, PrismaService, ServicesService],
})
export class OfficesModule {}
