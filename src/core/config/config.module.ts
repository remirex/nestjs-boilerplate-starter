import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import enviromentValidation from './enviroment.validation';
import { ApiConfigService } from './providers/config.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: enviromentValidation,
        }),
    ],
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
export class ApiConfigModule {}
