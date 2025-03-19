import { ErrorDetailDto } from './error-detail.dto';

export class ErrorDto {
  timestamp: string;
  statusCode: number;
  error: string | undefined;
  errorCode?: number;
  message: string;
  details?: ErrorDetailDto[];
  stack?: string;
  trace?: Error | string;
}
