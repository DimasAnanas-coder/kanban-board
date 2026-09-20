export type ApplicationErrorKind =
    | 'not_found' 
    | 'bad_request' 
    | 'validation' 
    | 'conflict' 
    | 'forbidden' 
    | 'unauthorized' 
    | 'internal_server_error';

export abstract class ApplicationError extends Error {
    constructor(
        public readonly code: string,
        message: string,
        public readonly kind: ApplicationErrorKind,
    ) {
        super(message);
        this.name = new.target.name;
    }
}
