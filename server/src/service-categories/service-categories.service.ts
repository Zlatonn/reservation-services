import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateServiceCategoryDto } from "./dto/create-service-category.dto"
import { UpdateServiceCategoryDto } from "./dto/update-service-category.dto"
import { PrismaService } from "src/prisma.service"
// import { ServiceNamesService } from "src/service-names/service-names.service"

@Injectable()
export class ServiceCategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async createServiceCateory(serviceCategoryData: CreateServiceCategoryDto) {
		// check service category unique
		const serviceCategoryExists = await this.prisma.serviceCategory.findUnique({
			where: { name: serviceCategoryData.name },
		})
		if (serviceCategoryExists) throw new ConflictException("Service category must be unique")

		const result = await this.prisma.serviceCategory.create({ data: serviceCategoryData })

		// return when success
		return {
			statusCode: 201,
			message: "Service category created",
			data: result,
		}
	}

	async findAllServiceCategories() {
		const result = await this.prisma.serviceCategory.findMany()

		// return when success
		return {
			statusCode: 200,
			message: "Service categories recived",
			data: result,
		}
	}

	async updateServiceCategory(id: string, serviceCategoryData: UpdateServiceCategoryDto) {
		// check service category not found
		const foundServiceCategory = await this.prisma.serviceCategory.findUnique({ where: { id } })
		if (!foundServiceCategory) throw new NotFoundException("Service category not found")

		// check service category unique
		const serviceCategoryExists = await this.prisma.serviceCategory.findUnique({
			where: { name: serviceCategoryData.name },
		})
		if (serviceCategoryExists) throw new ConflictException("Service category must be unique")

		const result = await this.prisma.serviceCategory.update({ where: { id }, data: serviceCategoryData })

		// return when success
		return {
			statusCode: 201,
			message: "Service category updated",
			data: result,
		}
	}

	async deleteServiceCategory(id: string) {
		// check service category not found
		const foundServiceCategory = await this.prisma.serviceCategory.findUnique({ where: { id } })
		if (!foundServiceCategory) throw new NotFoundException("Service category not found")

		const result = await this.prisma.serviceCategory.delete({ where: { id } })
		return {
			statusCode: 204,
			message: "Service category deleted",
			data: result,
		}
	}
}
