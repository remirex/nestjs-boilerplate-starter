import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ApiConfigService } from '../config/config.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
