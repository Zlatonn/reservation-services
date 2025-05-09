import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateOfficeDto } from "./dto/create-office.dto"
import { PrismaService } from "src/prisma.service"
import { UpdateOfficeDto } from "./dto/update-office.dto"

@Injectable()
export class OfficesService {
	constructor(private prisma: PrismaService) {}

	async createOffice(officeData: CreateOfficeDto) {
		// check office unique
		const officeExists = await this.prisma.office.findUnique({ where: { name: officeData.name } })
		if (officeExists) throw new ConflictException("Office must be unique")

		const result = await this.prisma.office.create({ data: officeData })

		// return when success
		return {
			statusCode: 201,
			message: "Office created",
			data: result,
		}
	}

	async getAllOffices() {
		const result = await this.prisma.office.findMany()

		// return when success
		return {
			statusCode: 200,
			message: "Offices recived",
			data: result,
		}
	}

	async getOffice(id: string) {
		// check office not found
		const result = await this.prisma.office.findUnique({ where: { id } })
		if (!result) throw new NotFoundException("Office not found")

		// return when success
		return {
			statusCode: 200,
			message: "Office recived",
			data: result,
		}
	}

	async updateOffice(id: string, officeData: UpdateOfficeDto) {
		// check office not found
		const foundOffice = await this.prisma.office.findUnique({ where: { id } })
		if (!foundOffice) throw new NotFoundException("Office not found")

		// check office unique
		const officeExists = await this.prisma.office.findUnique({ where: { name: officeData.name } })
		if (officeExists) throw new ConflictException("Office must be unique")

		const result = await this.prisma.office.update({ where: { id }, data: officeData })

		// return when success
		return {
			statusCode: 201,
			message: "Office updated",
			data: result,
		}
	}

	async deleteOffice(id: string) {
		// check office not found
		const foundOffice = await this.prisma.office.findUnique({ where: { id } })
		if (!foundOffice) throw new NotFoundException("Office not found")

		const result = await this.prisma.office.delete({ where: { id } })

		// return when success
		return {
			statusCode: 204,
			message: "Office deleted",
			data: result,
		}
	}
}
