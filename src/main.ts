import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("News Today")
        .setDescription("Rest Api Documentation")
        .setVersion("1.0.0")
        .addTag("News Today")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    app.enableCors({
        origin: [/^(.*)/],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders:
            "Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for",
    });

    await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
}

start();
