import { Injectable } from "@nestjs/common"
import { CreateServiceDto } from "./dto/create-service.dto"
import { PrismaService } from "src/prisma.service"
import { UpdateServiceDto } from "./dto/update-service.dto"

@Injectable()
export class ServicesService {
	constructor(private prisma: PrismaService) {}

	async createService(serviceData: CreateServiceDto) {
		return await this.prisma.$transaction(async (tx) => {
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

			// return created result
			return await tx.service.findUnique({
				where: { id: service.id },
				include: {
					openingDays: {
						include: {
							timeslots: true,
						},
					},
				},
			})
		})
	}

	async getService(id: string) {
		return await this.prisma.service.findUnique({
			where: { id },
			include: {
				openingDays: {
					include: {
						timeslots: true,
					},
				},
			},
		})
	}

	async updateService(id: string, serviceData: UpdateServiceDto) {
		return this.prisma.$transaction(async (tx) => {
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

			// return created result
			return await tx.service.findUnique({
				where: { id },
				include: {
					openingDays: {
						include: {
							timeslots: true,
						},
					},
				},
			})
		})
	}

	async deleteService(id: string) {
		return await this.prisma.service.delete({ where: { id } })
	}
}
