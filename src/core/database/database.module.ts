import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from '../config/config.service';
import { DataSource } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.databaseConfig,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        const logger = new LoggerService();

        try {
          logger.log('⏳ Pokušaj konekcije sa bazom...');
          const dataSource = await new DataSource(options).initialize();
          logger.log('✅ Uspostavljena konekcija sa bazom podataka!');
          return dataSource;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? (error.stack ?? error.message)
              : 'Nepoznata greška';

          logger.error('❌ Greška pri povezivanju sa bazom!', errorMessage);

          throw error;
        }
      },
    }),
  ],
})
export class DatabaseModule {}
