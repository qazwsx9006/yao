const { middlewareHandler } = require("../middleware");
const joiValidate = require("../lib/joi-validate.js");
const { getRouter } = require("../lib/router");
const Router = getRouter();
const { Joi } = Router;

/**
 * example, 僅測試時可解除註解。
 */
const routes = [
  // {
  //   method: "get",
  //   path: "/",
  //   handler: async (ctx) => {
  //     ctx.body = "hello world.";
  //   },
  // },
  // {
  //   method: "get",
  //   path: "/joi",
  //   handler: middlewareHandler.publicApiHandler(async (ctx) => {
  //     ctx.body = {
  //       joi: "yes",
  //     };
  //   }),
  //   validate: joiValidate.generateGetValidate(
  //     {
  //       my: Joi.string().required(),
  //     },
  //     {
  //       joi: Joi.string().required(),
  //     }
  //   ),
  // },
];

module.exports = routes;
