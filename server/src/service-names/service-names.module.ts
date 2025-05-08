import { Module } from "@nestjs/common"
import { ServiceNamesService } from "./service-names.service"
import { ServiceNamesController } from "./service-names.controller"
import { PrismaService } from "src/prisma.service"

@Module({
	controllers: [ServiceNamesController],
	providers: [ServiceNamesService, PrismaService],
	exports: [ServiceNamesService],
})
export class ServiceNamesModule {}
