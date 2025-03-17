import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/providers/logger.service';
import { ApiConfigService } from './core/config/providers/config.service';
import helmet from 'helmet';
import * as compression from 'compression';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = app.get(LoggerService);
    const configService = app.get(ApiConfigService);
    const port = configService.app.port ?? 3000;
    const nodeEnv = configService.nodeEnv || 'development';

    // Security & Performance Middlewares
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        }),
    );
    app.use(compression());
    //TODO Customizing the Payload Size if need
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    // CORS Configuration
    const allowedOrigins = configService.app.origins
        ? configService.app.origins.split(',').map((origin) => origin.trim())
        : ['https://yourdomain.com'];

    app.enableCors({
        origin: (
            origin: string,
            callback: (arg0: null, arg1: boolean) => void,
        ) => {
            callback(null, !origin || allowedOrigins.includes(origin));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    // Global Validation Pipes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Start Server
    try {
        await app.listen(port);
        logger.log(`🚀 Server running on Port: ${port}`);
        logger.log(`🌍 Environmet: ${nodeEnv}`);
    } catch (error) {
        logger.error(
            '❌ Error launching the application!',
            error instanceof Error ? error.message : 'Unknown error',
        );
        process.exit(1); // Exit process on failure
    }

    // Handle graceful shutdown
    async function handleShutdown(signal: string) {
        try {
            logger.warn(`🛑 ${signal} received. Gracefully shutting down...`);
            await app.close();
            logger.warn('✅ Server shut down successfully.');
            process.exit(0);
        } catch (error) {
            logger.error(
                'Error during shutdown:',
                error instanceof Error ? error.message : 'Unknown error',
            );
            process.exit(1);
        }
    }
    ['SIGINT', 'SIGTERM'].forEach((signal) =>
        process.on(signal, () => void handleShutdown(signal)),
    );
}
void bootstrap();
