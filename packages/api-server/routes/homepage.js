const { middlewareHandler } = require("@mingyu/server/middleware");
const joiValidate = require("@mingyu/server/lib/joi-validate");
const { getRouter } = require("@mingyu/server").router;
const Router = getRouter();
const { Joi } = Router;
const HomePageController = require("../controllers/homepage");
const homePageController = new HomePageController();

const routes = [
  {
    method: "get",
    path: "/joi",
    handler: middlewareHandler.publicApiHandler(homePageController.home),
    validate: joiValidate.generateGetValidate(
      {
        my: Joi.string().required(),
      },
      {
        joi: Joi.string().required(),
        my: Joi.string().required(),
      }
    ),
  },
];

module.exports = routes;
