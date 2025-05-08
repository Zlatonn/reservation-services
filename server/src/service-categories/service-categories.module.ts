import { Module } from "@nestjs/common"
import { ServiceCategoryService } from "./service-categories.service"
import { ServiceCategoryController } from "./service-categories.controller"
import { PrismaService } from "src/prisma.service"
import { ServiceNamesService } from "src/service-names/service-names.service"

@Module({
	controllers: [ServiceCategoryController],
	providers: [ServiceCategoryService, PrismaService, ServiceNamesService],
})
export class ServiceCategoryModule {}
