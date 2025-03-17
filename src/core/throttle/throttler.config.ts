import { ThrottlerModule } from '@nestjs/throttler';
import { ApiConfigService } from '../config/providers/config.service';

export const ThrottlerConfig = ThrottlerModule.forRootAsync({
  inject: [ApiConfigService],
  useFactory: (config: ApiConfigService) => [
    {
      ttl: config.rateLimit.ttl,
      limit: config.rateLimit.limit,
    },
  ],
});
