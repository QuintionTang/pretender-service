class Util {
    constructor() {
        this.statusCode = null;
        this.code = -1;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.code = 0;
    }

    setError(statusCode, errors, errorCode) {
        this.statusCode = statusCode;
        this.message = errors;
        this.code = errorCode || statusCode;
    }

    send(res) {
        const result = {
            code: this.code,
            message: this.message,
            data: this.data,
        };

        if (this.code === 0) {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
            code: this.code,
            message: this.message,
        });
    }
}

module.exports = new Util();
