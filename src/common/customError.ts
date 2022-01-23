class CustomError extends Error {
    isCustom: boolean;
    statusCode: number;

    constructor(statusCode: number, msg: string) {
        super(msg);
        this.name = 'CustomError';
        this.isCustom = true;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, CustomError);
    }
}

export default CustomError;