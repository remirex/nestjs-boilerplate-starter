import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './providers/logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const startTime = Date.now();

        res.on('finish', () => {
            const responseTime = Date.now() - startTime;
            const { statusCode } = res;

            this.logger.log(
                `[${method}] ${originalUrl} - ${statusCode} (${responseTime}ms)`,
            );
        });
        next();
    }
}
