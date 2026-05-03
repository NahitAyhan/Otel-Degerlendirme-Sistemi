import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //Dışarıdan gelen isteklere izin vermek için.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err)); // Sunucu başlarken herhangi bir hata çıkarsa konsolda yazdırmak için.
