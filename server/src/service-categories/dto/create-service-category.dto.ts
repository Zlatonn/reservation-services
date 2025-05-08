import { IsString } from "class-validator"

export class CreateServiceCategoryDto {
	@IsString()
	readonly name: string
}
