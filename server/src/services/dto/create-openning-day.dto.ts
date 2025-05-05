import { IsEnum } from "class-validator"

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
}
