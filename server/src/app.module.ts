import { Module } from "@nestjs/common"
import { OfficesModule } from "./offices/offices.module"
import { ServicesModule } from "./services/services.module"
import { ServiceCategoryModule } from "./service-categories/service-categories.module"
import { ServiceNamesModule } from "./service-names/service-names.module"

@Module({
	imports: [OfficesModule, ServicesModule, ServiceCategoryModule, ServiceNamesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
