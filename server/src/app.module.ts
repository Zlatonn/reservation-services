import { Module } from "@nestjs/common"
import { OfficesModule } from "./offices/offices.module"
import { ServicesModule } from "./services/services.module"

@Module({
	imports: [OfficesModule, ServicesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
