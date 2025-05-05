import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { GlobalExceptionFilter } from "./common/filters/exception.filter"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({
		origin: "http://localhost:5173",
	})
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	)
	app.useGlobalFilters(new GlobalExceptionFilter())
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
