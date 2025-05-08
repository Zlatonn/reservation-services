import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateServiceNameDto } from "./dto/create-service-name.dto"
import { UpdateServiceNameDto } from "./dto/update-service-name.dto"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class ServiceNamesService {
	constructor(private readonly prisma: PrismaService) {}

	async createServiceName(serviceNameData: CreateServiceNameDto) {
		// check service category exists
		const foundServiceCategory = await this.prisma.serviceCategory.findUnique({
			where: { id: serviceNameData.serviceCategoryId },
		})
		if (!foundServiceCategory) throw new NotFoundException("Service category not found")

		// check service name unique
		const serviceNameExists = await this.prisma.serviceName.findUnique({
			where: { name: serviceNameData.name },
		})
		if (serviceNameExists) throw new ConflictException("Service name must be unique")

		const result = await this.prisma.serviceName.create({
			data: {
				name: serviceNameData.name,
				serviceCategory: {
					connect: { id: serviceNameData.serviceCategoryId },
				},
			},
		})

		// return when success
		return {
			statusCode: 201,
			message: "Service name created",
			data: result,
		}
	}

	async findAllServiceNames() {
		const result = await this.prisma.serviceName.findMany()

		// return when success
		return {
			statusCode: 200,
			message: "Service names recived",
			data: result,
		}
	}

	async updateServiceName(id: string, serviceNameData: UpdateServiceNameDto) {
		// check service category exists
		const foundServiceCategory = await this.prisma.serviceCategory.findUnique({
			where: { id: serviceNameData.serviceCategoryId },
		})
		if (!foundServiceCategory) throw new NotFoundException("Service category not found")

		// check service name not found
		const foundServiceName = await this.prisma.serviceName.findUnique({ where: { id } })
		if (!foundServiceName) throw new NotFoundException("Service name not found")

		// check service name unique
		const serviceNameExists = await this.prisma.serviceName.findUnique({
			where: { name: serviceNameData.name },
		})
		if (serviceNameExists) throw new ConflictException("Service name must be unique")

		const result = await this.prisma.serviceName.update({
			where: { id },
			data: {
				name: serviceNameData.name,
				serviceCategory: {
					connect: { id: serviceNameData.serviceCategoryId },
				},
			},
		})

		// return when success
		return {
			statusCode: 201,
			message: "Service name updated",
			data: result,
		}
	}

	async deleteServiceName(id: string) {
		// check service name not found
		const foundServiceName = await this.prisma.serviceName.findUnique({ where: { id } })
		if (!foundServiceName) throw new NotFoundException("Service category not found")

		// return when success
		const result = await this.prisma.serviceName.delete({ where: { id } })
		return {
			statusCode: 204,
			message: "Service name deleted",
			data: result,
		}
	}

	async getServiceNamesByServiceCategoryId(serviceCategoryId: string) {
		// check service category not found
		const foundServiceCategory = await this.prisma.serviceCategory.findUnique({ where: { id: serviceCategoryId } })
		if (!foundServiceCategory) throw new NotFoundException("Service category not found")

		const result = await this.prisma.serviceName.findMany({
			where: { serviceCategoryId },
			select: {
				id: true,
				name: true,
			},
		})

		// return when success
		return {
			statusCode: 200,
			message: "Service names received",
			data: result,
		}
	}
}
