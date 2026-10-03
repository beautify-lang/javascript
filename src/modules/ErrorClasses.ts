export class StructuredError extends Error implements Error {
    constructor(message: string = "Error Message not given. Please check the stack trace for more info.", cause?: unknown, showStackTrace: boolean = true) {
        super(message, {cause});
        !showStackTrace ? this.stack = "" : null;
    };
};

export class ZeroDivisionError extends StructuredError implements StructuredError {
    constructor(message?: string, cause?: unknown, showStackTrace: boolean = true) {
        super(message, cause, showStackTrace);
        this.name = "ZeroDivisionError";
    };
};

export class ValueError extends StructuredError implements StructuredError {
    constructor(message?: string, cause?: unknown, showStackTrace: boolean = false){
        super(message, cause, showStackTrace);
        this.name = "ValueError";
    }
};