export const schemaValidator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

//Async Handler
export const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
};

//Error Handler
class ApiError extends Error{
    constructor(statusCode,message="Something went wrong!",errors=[],stack=""){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}

//Response Handler

class ApiResponse {
    constructor(statusCode,data,message="Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400
    }
}

export {ApiResponse}

//JOI Handler
export const validateSchema = (schema) => asyncHandler((req,res,next) => {
    const {error} = schema.validate(req.body);
    if(error){
        throw new ApiError(400,error.details[0].message)
    }
    next()
})