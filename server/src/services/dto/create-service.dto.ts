import { Type } from "class-transformer"
import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator"
import { CreateOpenningDayDto } from "./create-openning-day.dto"

export class CreateServiceDto {
	@IsString()
	readonly category: string

	@IsString()
	readonly name: string

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
