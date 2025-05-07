import { IsNumber, IsString, Matches } from "class-validator"

export class CreateTimeSlotDto {
	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
		message: "startTime must be in HH:mm format",
	})
	readonly startAt: string

	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
		message: "endTime must be in HH:mm format",
	})
	readonly endAt: string

	@IsNumber()
	readonly available: number
}
