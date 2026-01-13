import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
        exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error';

        /*console.error('=== ALL EXCEPTIONS FILTER ===');
        console.error('Error:', exception);
        console.error('URL:', request.url);
        console.error('Method:', request.method);
        if (exception instanceof Error) {
            console.error('Error name:', exception.name);
            console.error('Error message:', exception.message);
            console.error('Error stack:', exception.stack);
        }*/

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
