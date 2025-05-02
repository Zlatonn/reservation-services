import { Type } from "class-transformer"
import { IsArray, IsDate, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator"
import { CreateOpenningDayDto } from "./create-openning-day.dto"

export enum CategoryName {
	REGISTRATION = "REGISTRATION",
	LICENSE = "LICENSE",
	FOREIGN_LICENSE = "FOREIGN_LICENSE",
	PERSONAL_LICENSE = "PERSONAL_LICENSE",
	PUBLIC_LICENSE = "PUBLIC_LICENSE",
	TRANSPORT_LAW_LICENSE = "TRANSPORT_LAW_LICENSE",
	POINT_TRAINING = "POINT_TRAINING",
	OTHER_SERVICES = "OTHER_SERVICES",
}

export enum ServiceName {
	TAX_PAYMENT = "TAX_PAYMENT",
	VEHICLE_MOVE_OUT = "VEHICLE_MOVE_OUT",
	VEHICLE_UNUSED = "VEHICLE_UNUSED",
	DUP_REGISTRATION_BOOK = "DUP_REGISTRATION_BOOK",
	DUP_TAX_STICKER = "DUP_TAX_STICKER",
	DUP_LICENSE_PLATE = "DUP_LICENSE_PLATE",
	LEASING_TRANSFER = "LEASING_TRANSFER",
	TAXI_RETIRE = "TAXI_RETIRE",
	VEHICLE_MODIFICATION = "VEHICLE_MODIFICATION",
	VEHICLE_MOVE_IN = "VEHICLE_MOVE_IN",
	OWNER_INFO_UPDATE = "OWNER_INFO_UPDATE",
}

export class CreateServiceDto {
	@IsEnum(CategoryName)
	readonly category: CategoryName

	@IsEnum(ServiceName)
	readonly name: ServiceName

	@Type(() => Date)
	@IsDate()
	readonly reservableDate: Date

	@IsOptional()
	@IsString()
	readonly description: string

	@IsUUID()
	@IsString()
	readonly officeId: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOpenningDayDto)
	readonly openingDays: CreateOpenningDayDto[]
}
