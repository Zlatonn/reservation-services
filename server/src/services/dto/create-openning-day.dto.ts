import { IsArray, IsEnum, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateTimeSlotDto } from "./create-time-slot.dto"

export enum DayOfWeek {
	SUNDAY = 0,
	MONDAY = 1,
	TUESDAY = 2,
	WEDNESDAY = 3,
	THURSDAY = 4,
	FRIDAY = 5,
	SATURDAY = 6,
}

export class CreateOpenningDayDto {
	@IsEnum(DayOfWeek)
	readonly day: DayOfWeek

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateTimeSlotDto)
	readonly timeSlots: CreateTimeSlotDto[]
}
