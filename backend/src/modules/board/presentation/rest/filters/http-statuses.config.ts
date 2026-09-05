import { ApplicationErrorKind } from "@/modules/board/application/errors/application.error.js";
import { HttpStatus } from "@nestjs/common";


export const HTTP_STATUS_BY_ERROR_KIND: Record<ApplicationErrorKind, HttpStatus> = {
    'not_found': HttpStatus.NOT_FOUND,
    'bad_request': HttpStatus.BAD_REQUEST,
    'validation': HttpStatus.UNPROCESSABLE_ENTITY,
    'conflict': HttpStatus.CONFLICT,
    'forbidden': HttpStatus.FORBIDDEN,
    'unauthorized': HttpStatus.UNAUTHORIZED,
    'internal_server_error': HttpStatus.INTERNAL_SERVER_ERROR,
};