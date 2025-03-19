import { BadRequestException } from '@nestjs/common';
import { ErrorCode } from 'src/constants/error-code.constant';

export class ValidationException extends BadRequestException {
  constructor(error: ErrorCode = ErrorCode.V000, message?: string) {
    super({ errorCode: error, message });
  }
}
