import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ApiConfigService } from '../config/config.service';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private readonly configService: ApiConfigService) {
    const logLevel = this.configService.appConfig.logLevel;
    const logService = this.configService.appConfig.logService;
    const isDebug = this.configService.appConfig.debug;

    const transports: winston.transport[] = [];

    if (logService.includes('console')) {
      transports.push(
        new winston.transports.Console({
          level: logLevel,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      );
    }

    if (logService.includes('file')) {
      transports.push(
        new winston.transports.DailyRotateFile({
          filename: 'logs/app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: logLevel,
        }),
      );
    }

    this.logger = winston.createLogger({
      level: isDebug ? 'debug' : logLevel,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${String(timestamp)} [${level.toUpperCase()}]: ${String(message)}`;
        }),
      ),
      transports,
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - Trace: ${trace || 'N/A'}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
