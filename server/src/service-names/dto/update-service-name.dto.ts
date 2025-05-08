import { PartialType } from "@nestjs/mapped-types"
import { CreateServiceNameDto } from "./create-service-name.dto"

export class UpdateServiceNameDto extends PartialType(CreateServiceNameDto) {}
