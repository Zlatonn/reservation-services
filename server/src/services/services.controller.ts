import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common"
import { ServicesService } from "./services.service"
import { CreateServiceDto } from "./dto/create-service.dto"
import { UpdateServiceDto } from "./dto/update-service.dto"

@Controller("services")
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Post()
	create(@Body() createServiceDto: CreateServiceDto) {
		return this.servicesService.createService(createServiceDto)
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.servicesService.getService(id)
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
		return this.servicesService.updateService(id, updateServiceDto)
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.servicesService.deleteService(id)
	}
}
