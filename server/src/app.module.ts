import { Module } from "@nestjs/common"
import { OfficesModule } from "./offices/offices.module"
import { ServicesModule } from "./services/services.module"
import { ServiceCategoryModule } from "./service-categories/service-categories.module"

@Module({
	imports: [OfficesModule, ServicesModule, ServiceCategoryModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
