import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common"
import { ServiceCategoryService } from "./service-categories.service"
import { CreateServiceCategoryDto } from "./dto/create-service-category.dto"
import { UpdateServiceCategoryDto } from "./dto/update-service-category.dto"
import { ServiceNamesService } from "src/service-names/service-names.service"

@Controller("service-categories")
export class ServiceCategoryController {
	constructor(
		private readonly serviceCategoryService: ServiceCategoryService,
		private readonly serviceNamesService: ServiceNamesService,
	) {}

	@Post()
	create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
		return this.serviceCategoryService.createServiceCateory(createServiceCategoryDto)
	}

	@Get()
	findAll() {
		return this.serviceCategoryService.findAllServiceCategories()
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
		return this.serviceCategoryService.updateServiceCategory(id, updateServiceCategoryDto)
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.serviceCategoryService.deleteServiceCategory(id)
	}

	@Get(":id/service-names")
	findAllServiceNamesById(@Param("id") id: string) {
		return this.serviceNamesService.getServiceNamesByServiceCategoryId(id)
	}
}
