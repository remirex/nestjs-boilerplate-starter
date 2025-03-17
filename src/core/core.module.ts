import { Module } from '@nestjs/common';
import { ApiConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ApiThrottlerModule } from './throttler/throttler.module';

@Module({
  imports: [ApiConfigModule, DatabaseModule, LoggerModule, ApiThrottlerModule],
})
export class CoreModule {}
