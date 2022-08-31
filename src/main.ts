import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AllExceptionsFilter from './filters/all-exceptions.filter';
import AppModule from './modules/app/app.module';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('intership-nest')
        .setDescription('intership-nest API description')
        .setVersion('0.0.1')
        .addTag('intership-nest')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'Token',
            },
            'access-token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
