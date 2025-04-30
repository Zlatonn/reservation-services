import { Module } from "@nestjs/common"
import { OfficesModule } from "./offices/offices.module"

@Module({
	imports: [OfficesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
