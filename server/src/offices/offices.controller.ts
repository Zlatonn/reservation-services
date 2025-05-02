import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common"
import { OfficesService } from "./offices.service"
import { CreateOfficeDto } from "./dto/create-office.dto"
import { UpdateOfficeDto } from "./dto/update-office.dto"

@Controller("offices")
export class OfficesController {
	constructor(private readonly officesService: OfficesService) {}

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
}
