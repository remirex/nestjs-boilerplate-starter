import {
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/core/logger/providers/logger.service';

@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        this.logger.error(
            `Status: ${status} | Message: ${JSON.stringify(message)}`,
            exception instanceof Error ? exception.stack : undefined,
        );

        response.status(status).json({
            statusCode: status,
            message: message instanceof Object ? message : { error: message },
            timestamp: new Date().toISOString(),
        });
    }
}
