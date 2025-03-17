import { Module } from '@nestjs/common';
import { ApiConfigService } from '../config/providers/config.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => [
        {
          ttl: config.rateLimit.ttl,
          limit: config.rateLimit.limit,
        },
      ],
    }),
  ],
})
export class ApiThrottlerModule {}
