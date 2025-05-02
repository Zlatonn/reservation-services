import { Injectable } from "@nestjs/common"
import { CreateOfficeDto } from "./dto/create-office.dto"
import { PrismaService } from "src/prisma.service"
import { UpdateOfficeDto } from "./dto/update-office.dto"

@Injectable()
export class OfficesService {
	constructor(private prisma: PrismaService) {}

	async createOffice(officeData: CreateOfficeDto) {
		return await this.prisma.office.create({ data: officeData })
	}

	async getAllOffices() {
		return await this.prisma.office.findMany()
	}

	async getOffice(id: string) {
		return await this.prisma.office.findUnique({ where: { id }, include: { services: true } })
	}

	async updateOffice(id: string, officeData: UpdateOfficeDto) {
		return await this.prisma.office.update({ where: { id }, data: officeData })
	}

	async deleteOffice(id: string) {
		return await this.prisma.office.delete({ where: { id } })
	}
}
