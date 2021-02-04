import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  (function configureSwaggerModule(app) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Relearn Nest')
      .setDescription('This is an effort to revise NestJS Concepts.')
      .setVersion('1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, swaggerDocument);
  })(app);

  (function configureValidation(app) {
    app.useGlobalPipes(new ValidationPipe());
  })(app);

  await app.listen(3000);
}
bootstrap();
