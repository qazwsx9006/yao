const { middlewareHandler } = require("../middleware");
const joiValidate = require("../lib/joi-validate.js");
const { getRouter } = require("../lib/router");
const Router = getRouter();
const { Joi } = Router;

const routes = [
  {
    method: "post",
    path: "/upload-form",
    handler: middlewareHandler.publicApiHandler(async (ctx) => {
      console.log(ctx.request.body);
      ctx.body = ctx.request.body;
    }),
    validate: joiValidate.generatePostValidate(
      {
        text: Joi.string().required(),
      },
      {
        text: Joi.string().required(),
      }
    ),
  },
  {
    method: "post",
    path: "/upload-file",
    handler: middlewareHandler.publicApiWithFileHandler(
      async (ctx) => {
        const { text } = ctx.request.body;
        const { file } = ctx.request;
        console.log(0, { text, file });
        ctx.body = { text };
      },
      { uploadField: "file" }
    ),
    validate: joiValidate.generateMultipartWithMulterValidate(),
  },
  {
    method: "post",
    path: "/upload-files",
    handler: middlewareHandler.publicApiWithFilesHandler(
      async (ctx) => {
        const { text } = ctx.request.body;
        const { cover, images } = ctx.request.files;
        console.log({ text, cover, images });
        ctx.body = { text };
      },
      {
        uploadFields: [
          { name: "cover", maxCount: 1 },
          { name: "images", maxCount: 3 },
        ],
      }
    ),
    validate: joiValidate.generateMultipartWithMulterValidate({
      text: Joi.string().required(),
    }),
  },
];

module.exports = routes;
