const multer = require("@koa/multer");
const apiErrorMiddleware = require("./api-error");
const upload = multer();

function initialMiddleware(app, routers = []) {
  for (const router of routers) {
    app.use(router.middleware());
  }
  return app;
}

const middlewareHandler = {
  publicApiHandler: (handler) => {
    return [apiErrorMiddleware, handler];
  },
  publicApiWithFileHandler: (handler, params = {}) => {
    const { uploadField = "file" } = params;
    const uploadMiddleware = upload.single(uploadField);
    return [apiErrorMiddleware, uploadMiddleware, handler];
  },
  publicApiWithFilesHandler: (handler, params = {}) => {
    const { uploadFields = [{ name: "fields", maxCount: 3 }] } = params;
    const uploadMiddleware = upload.fields(uploadFields);
    return [apiErrorMiddleware, uploadMiddleware, handler];
  },
};

module.exports = {
  initialMiddleware,
  middlewareHandler,
};
