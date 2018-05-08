import * as fs from 'fs-extra';
import * as path from 'path';
import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function writeDoc() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .build();
    const document = SwaggerModule.createDocument(app, options);

    fs.ensureDirSync(path.join(process.cwd(), 'dist'));
    fs.writeJsonSync(path.join(process.cwd(), 'dist', 'api-doc.json'), document, { spaces: 2 });
}

writeDoc();
