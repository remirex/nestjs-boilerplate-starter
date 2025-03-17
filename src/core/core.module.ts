import { Module } from '@nestjs/common';
import { ApiConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ThrottlerConfig } from './throttle/throttler.config';

@Module({
  imports: [ApiConfigModule, DatabaseModule, LoggerModule, ThrottlerConfig],
  exports: [ThrottlerConfig],
})
export class CoreModule {}
