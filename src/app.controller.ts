import {
    BadRequestException,
    Controller,
    Get,
    InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    private requestCount = 0; // Counter for tracking requests

    @Get('hello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('bad-request')
    throwBadRequest() {
        throw new BadRequestException('This is a bad request error');
    }

    @Get('server-error')
    throwServerError() {
        throw new InternalServerErrorException('This is a server error');
    }

    @SkipThrottle({ default: false })
    @Get('test-rate-limit')
    testRateLimit() {
        this.requestCount++; // Increment the counter
        return {
            message: 'Request successful',
            requestCount: this.requestCount, // Return the current request count
        };
    }
}
