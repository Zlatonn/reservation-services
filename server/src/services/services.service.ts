import { Prisma } from "@prisma/client"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateServiceDto } from "./dto/create-service.dto"
import { PrismaService } from "src/prisma.service"
import { UpdateServiceDto } from "./dto/update-service.dto"

@Injectable()
export class ServicesService {
	constructor(private prisma: PrismaService) {}

	async createService(serviceData: CreateServiceDto) {
		return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			// check office exists
			const foundOffice = await tx.office.findUnique({ where: { id: serviceData.officeId } })
			if (!foundOffice) throw new NotFoundException("Office not found")

			// Check duplicate opening day
			const uniqueDays = new Set()
			for (const openingDayData of serviceData.openingDays || []) {
				if (uniqueDays.has(openingDayData.day)) {
					throw new BadRequestException(`Duplicate opening day is: ${openingDayData.day}`)
				}
				uniqueDays.add(openingDayData.day)
			}

			// create service
			const service = await tx.service.create({
				data: {
					category: serviceData.category,
					name: serviceData.name,
					reservableDate: serviceData.reservableDate,
					description: serviceData.description,
					office: {
						connect: { id: serviceData.officeId },
					},
				},
			})

			// create opening days
			for (const openingDayData of serviceData.openingDays || []) {
				const openingDay = await tx.openingDay.create({
					data: {
						day: openingDayData.day,
						service: {
							connect: { id: service.id },
						},
					},
				})

				// create timeslots
				for (const timeSlotData of openingDayData.timeSlots || []) {
					await tx.timeSlot.create({
						data: {
							startAt: timeSlotData.startAt,
							endAt: timeSlotData.endAt,
							available: timeSlotData.available,
							openingDay: {
								connect: { id: openingDay.id },
							},
						},
					})
				}
			}

			// Adjust result pattern
			const result = await tx.service.findUnique({
				where: { id: service.id },
				include: {
					openingDays: {
						include: {
							timeSlots: true,
						},
					},
				},
			})

			// return when success
			return {
				statusCode: 201,
				message: "Service created",
				data: result,
			}
		})
	}

	async getService(id: string) {
		// check service not found
		const result = await this.prisma.service.findUnique({
			where: { id },
			include: {
				openingDays: {
					include: {
						timeSlots: true,
					},
				},
			},
		})

		if (!result) throw new NotFoundException("Service not found")

		// return when success
		return {
			statusCode: 200,
			message: "Service received",
			data: result,
		}
	}

	async updateService(id: string, serviceData: UpdateServiceDto) {
		return this.prisma.$transaction(async (tx) => {
			// check office not found
			const foundOffice = await tx.office.findUnique({ where: { id: serviceData.officeId } })
			if (!foundOffice) throw new NotFoundException("Office not found")

			// check service not found
			const foundService = await tx.service.findUnique({ where: { id } })
			if (!foundService) throw new NotFoundException("Service not found")

			// Check duplicate opening day
			const uniqueDays = new Set()
			for (const openingDayData of serviceData.openingDays || []) {
				if (uniqueDays.has(openingDayData.day)) {
					throw new BadRequestException(`Duplicate opening day is: ${openingDayData.day}`)
				}
				uniqueDays.add(openingDayData.day)
			}

			// reset opening day & timeslot
			await tx.openingDay.deleteMany({
				where: { serviceId: id },
			})

			// update service
			const service = await tx.service.update({
				where: { id },
				data: {
					category: serviceData.category,
					name: serviceData.name,
					reservableDate: serviceData.reservableDate,
					description: serviceData.description,
					office: {
						connect: { id: serviceData.officeId },
					},
				},
			})

			// create opening days
			for (const openingDayData of serviceData.openingDays || []) {
				const openingDay = await tx.openingDay.create({
					data: {
						day: openingDayData.day,
						service: {
							connect: { id: service.id },
						},
					},
				})

				// create timeslots
				for (const timeSlotData of openingDayData.timeSlots || []) {
					await tx.timeSlot.create({
						data: {
							startAt: timeSlotData.startAt,
							endAt: timeSlotData.endAt,
							available: timeSlotData.available,
							openingDay: {
								connect: { id: openingDay.id },
							},
						},
					})
				}
			}

			// Adjust result pattern
			const result = await tx.service.findUnique({
				where: { id: service.id },
				include: {
					openingDays: {
						include: {
							timeSlots: true,
						},
					},
				},
			})

			// return when success
			return {
				statusCode: 201,
				message: "Service updated",
				data: result,
			}
		})
	}

	async deleteService(id: string) {
		// check service not found
		const foundService = await this.prisma.service.findUnique({ where: { id } })
		if (!foundService) throw new NotFoundException("Service not found")

		const result = await this.prisma.service.delete({ where: { id } })

		// return when success
		return {
			statusCode: 204,
			message: "Service deleted",
			data: result,
		}
	}

	async getServicesByOfficeId(officeId: string, skip: number, take: number, search?: string) {
		// check office not found
		const foundOffice = await this.prisma.office.findUnique({ where: { id: officeId } })
		if (!foundOffice) throw new NotFoundException("Office not found")

		// Initial set up where condition with where office Id
		const where: Prisma.ServiceWhereInput = {
			officeId,
		}

		// Add search condition if search term is provided
		if (search) {
			where.name = {
				contains: search,
				mode: "insensitive",
			}
		}

		const [result, totalCount] = await Promise.all([
			// Fin data of services where  officeId = id
			this.prisma.service.findMany({
				where,
				skip,
				take,
				select: {
					id: true,
					category: true,
					name: true,
				},
			}),

			// Find count of services where  officeId = id
			this.prisma.service.count({ where }),
		])

		return {
			statusCode: 200,
			message: "Services received",
			data: result,
			totalCount,
		}
	}
}
