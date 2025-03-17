import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {}

    get isLocal(): boolean {
        return this.nodeEnv === 'local';
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    private getString(key: string): string {
        const value = this.get(key);

        return value.replaceAll('\\n', '\n');
    }

    private getNumber(key: string): number {
        const value = this.get(key);

        try {
            return Number(value);
        } catch {
            throw new Error(key + ' environment variable is not a number');
        }
    }

    get nodeEnv(): string {
        return this.getString('NODE_ENV');
    }

    get app() {
        return {
            port: this.getNumber('PORT'),
            origins: this.getString('CORS_ORIGIN'),
            url: this.getString('APP_URL'),
        };
    }

    get rateLimit() {
        return {
            ttl: this.getNumber('THROTTLE_TTL'),
            limit: this.getNumber('THROTTLE_LIMIT'),
        };
    }

    get databaseConfig(): TypeOrmModuleOptions {
        //const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];

        return {
            type: 'mariadb',
            host: this.getString('DB_HOST'),
            port: this.getNumber('MYSQL_TCP_PORT'),
            database: this.getString('MYSQL_DATABASE'),
            username: this.getString('MYSQL_USER'),
            password: this.getString('MYSQL_PASSWORD'),
            synchronize: !this.isLocal ? false : true,
        };
    }

    private get(key: string): string {
        const value = this.configService.get<string>(key);

        if (isNil(value)) {
            throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
        }

        return value;
    }
}
