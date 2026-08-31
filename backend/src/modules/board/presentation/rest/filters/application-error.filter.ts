import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ApplicationError } from '../../../application/errors/application.error.js';

import { HTTP_STATUS_BY_ERROR_KIND } from './http-statuses.config.js';

@Catch(ApplicationError)
export class ApplicationErrorFilter implements ExceptionFilter {
    catch(error: ApplicationError, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();

        const status = HTTP_STATUS_BY_ERROR_KIND[error.kind];
        response.status(status).json({
            statusCode: status,
            code: error.code,
            message: error.message,
        });
    }
}
