import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from "@nestjs/common"
import { OfficesService } from "./offices.service"
import { CreateOfficeDto } from "./dto/create-office.dto"
import { UpdateOfficeDto } from "./dto/update-office.dto"
import { ServicesService } from "src/services/services.service"

@Controller("offices")
export class OfficesController {
	constructor(
		private readonly officesService: OfficesService,
		private readonly servicesService: ServicesService,
	) {}

	@Post()
	create(@Body() createOfficeDto: CreateOfficeDto) {
		return this.officesService.createOffice(createOfficeDto)
	}

	@Get()
	findAll() {
		return this.officesService.getAllOffices()
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.officesService.getOffice(id)
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
		return this.officesService.updateOffice(id, updateOfficeDto)
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.officesService.deleteOffice(id)
	}

	@Get(":id/services")
	findAllServicesById(
		@Param("id") id: string,
		@Query("skip") skip?: string,
		@Query("take") take?: string,
		@Query("search") search?: string,
	) {
		const parsedSkip = parseInt(skip ?? "0", 10)
		const parsedTake = parseInt(take ?? "10", 10)
		return this.servicesService.getServicesByOfficeId(id, parsedSkip, parsedTake, search)
	}
}
