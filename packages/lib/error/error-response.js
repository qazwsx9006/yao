const ERROR_CODE = require("./error-code");

class ApiErrorResponse extends Error {
  constructor(message, debugMessage) {
    super();
    if (!message) return new ApiErrorResponse(ERROR_CODE.ERROR_UNDEFINED);
    const err = message.split(" ");

    // 自訂錯誤碼 (五碼)
    this.code = parseInt(err[0], 10);
    this.name = err[1];
    this.message = err[2];
    this.statusCode = 400;

    if (debugMessage) this.message = `${this.message} {${debugMessage}}`;

    switch (this.name) {
      case "BAD_ACCESS_TOKEN":
      case "BAD_VALIDATE_CODE":
      case "ACCESS_TOKEN_EXPIRED":
      case "HEADER_AUTHORIZATION_REQUIRED":
        this.statusCode = 401;
        break;
      case "BAD_REFRESH_TOKEN":
      case "USER_BLOCKED":
        this.statusCode = 403;
        break;
      default:
        this.statusCode = 400;
        break;
    }
  }
}

module.exports = ApiErrorResponse;
