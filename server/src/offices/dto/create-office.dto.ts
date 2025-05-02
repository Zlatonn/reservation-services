import { IsOptional, IsString } from "class-validator"

export class CreateOfficeDto {
	@IsString()
	readonly name: string

	@IsOptional()
	@IsString()
	readonly address: string
}
