import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  status?: string;
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    if (exceptionResponse?.status === 'error') {
      response.status(status).json(exceptionResponse);
      return;
    }

    response.status(status).json({
      status: 'error',
      statusCode: status,
      message:
        typeof exceptionResponse === 'object' && exceptionResponse?.message
          ? exceptionResponse.message
          : exception.message,
    });
  }
}
