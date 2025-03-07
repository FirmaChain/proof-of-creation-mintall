import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express'; // Import the Request type from express
import { Observable, map } from 'rxjs';
import { HTTP_STATUS } from '../constants/http.status.constants';
@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    // Get the HTTP request object and type it as an Express Request
    const request = context.switchToHttp().getRequest<Request>();

    // If the request URL is '/healthcheck', bypass the interceptor
    if (request.url === '/healthcheck') {
      return next.handle();
    }

    // Otherwise, format the response in a standardized way
    return next.handle().pipe(
      map((data: T) => ({
        status: 'success', // Indicate the operation was successful
        statusCode: HTTP_STATUS.OK.code, // Use the constant for the status code
        message: HTTP_STATUS.OK.message, // Use the constant for the message
        data: data || null, // The actual data returned by the handler
        // timestamp: new Date().toISOString(), // Timestamp of the response
      })),
    );
  }
}
