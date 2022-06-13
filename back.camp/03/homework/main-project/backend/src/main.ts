import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    ///////////////////////////////////////////////////////////////////////////
    app.enableCors({
        exposedHeaders: ['Authorization', 'Set-Cookie']
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    ///////////////////////////////////////////////////////////////////////////
    await app.listen(3000);
}
bootstrap();
