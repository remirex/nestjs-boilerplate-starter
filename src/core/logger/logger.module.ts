import { Global, Module } from '@nestjs/common';
import { LoggerService } from './providers/logger.service';

@Global()
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
