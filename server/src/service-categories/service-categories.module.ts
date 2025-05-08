import { Module } from "@nestjs/common"
import { ServiceCategoryService } from "./service-categories.service"
import { ServiceCategoryController } from "./service-categories.controller"
import { PrismaService } from "src/prisma.service"

@Module({
	controllers: [ServiceCategoryController],
	providers: [ServiceCategoryService, PrismaService],
})
export class ServiceCategoryModule {}
