import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from '../config/config.service';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

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

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database connection is active');
      } else {
        console.error('Database connection is not established');
      }
    } catch (error) {
      console.error('Error checking database connection:', error);
    }
  }
}
