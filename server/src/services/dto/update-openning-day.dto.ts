import { PartialType } from "@nestjs/mapped-types"
import { CreateOpenningDayDto } from "../../services/dto/create-openning-day.dto"

export class UpdateOpenningDayDto extends PartialType(CreateOpenningDayDto) {}
