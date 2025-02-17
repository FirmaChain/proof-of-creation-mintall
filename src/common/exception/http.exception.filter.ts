import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: unknown = exception.getResponse();

    let message = 'An error occurred';
    // let errorDetails = '';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const responseObj = exceptionResponse as {
        message?: string;
        error?: string;
      };
      message = responseObj.message || 'Internal server error';
      // errorDetails = responseObj.error || '';
    }

    response.status(status).json({
      status: 'error',
      statusCode: status,
      message: message,
      // error: errorDetails,
    });
  }
}
