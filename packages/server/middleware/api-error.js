const _ = require("lodash");
const ErrorResponse = require("@mingyu/lib/error/error-response");
const ErrorCode = require("@mingyu/lib/error/error-code");

module.exports = async (ctx, next) => {
  let error = new ErrorResponse();
  if (ctx.invalid) {
    // joi continueOnError: true
    const invalidMessage = _.map(ctx.invalid, (error, type) => {
      return `${type} => ${error.message}`;
    }).join(", ");
    error = new ErrorResponse(ErrorCode.JOI_VALIDATION_ERROR, invalidMessage);
    ctx.status = error.statusCode;
    ctx.body = resError(error);
  } else {
    try {
      await next();
    } catch (err) {
      if (err.statusCode) {
        error = err;
      } else {
        logger.error(err);
      }
      ctx.status = error.statusCode;
      ctx.body = resError(error);
    }
  }
};

const resError = function (error) {
  return {
    status: error.statusCode,
    code: error.code,
    name: error.name,
    message: error.message,
  };
};
