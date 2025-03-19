import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { ErrorDto } from 'src/common/dto/error.dto';
import { ApiConfigService } from 'src/core/config/config.service';
import { LoggerService } from 'src/core/logger/logger.service';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly debug: boolean;

  constructor(
    private readonly configService: ApiConfigService,
    private readonly logger: LoggerService,
  ) {
    this.debug = this.configService.appConfig.debug;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error: ErrorDto = this.handleError(exception);

    if (this.debug && exception instanceof Error) {
      error.stack = exception.stack;
      error.trace = exception.message;
      this.logger.debug(`Exception caught: ${exception.message}`);
    }

    response.status(error.statusCode).json(error);
  }

  private handleError(exception: unknown): ErrorDto {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';

    if (exception instanceof Error) {
      message = exception.message;
    } else if (typeof exception === 'string') {
      message = exception;
    }

    this.logger.error(`Error: ${message}`);

    return {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode] ?? 'Unknown Error',
      message,
    };
  }
}
