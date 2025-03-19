import { Module } from '@nestjs/common';
import { ApiConfigService } from '../config/config.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => ({
        throttlers: [config.throttlerConfigs],
      }),
    }),
  ],
})
export class ApiThrottlerModule {}
