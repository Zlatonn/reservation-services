import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common"
import { ServiceNamesService } from "./service-names.service"
import { CreateServiceNameDto } from "./dto/create-service-name.dto"
import { UpdateServiceNameDto } from "./dto/update-service-name.dto"

@Controller("service-names")
export class ServiceNamesController {
	constructor(private readonly serviceNamesService: ServiceNamesService) {}

	@Post()
	create(@Body() createServiceNameDto: CreateServiceNameDto) {
		return this.serviceNamesService.createServiceName(createServiceNameDto)
	}

	@Get()
	findAll() {
		return this.serviceNamesService.findAllServiceNames()
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() updateServiceNameDto: UpdateServiceNameDto) {
		return this.serviceNamesService.updateServiceName(id, updateServiceNameDto)
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.serviceNamesService.deleteServiceName(id)
	}
}
