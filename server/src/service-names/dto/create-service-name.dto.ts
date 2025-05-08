import { IsString, IsUUID } from "class-validator"

export class CreateServiceNameDto {
	@IsString()
	readonly name: string

	@IsUUID()
	@IsString()
	readonly serviceCategoryId: string
}
