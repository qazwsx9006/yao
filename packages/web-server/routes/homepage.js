const { joiValidate } = require("@mingyu/server");
const { Joi, generateDefaultPostValidate } = joiValidate;
const HomePageController = require("../controllers/homepage");
const homePageController = new HomePageController();

const routes = [
  {
    method: "post",
    path: "/form",
    handler: homePageController.createForm,
  },
  {
    method: "get",
    path: "/form",
    handler: homePageController.form,
  },
];

module.exports = routes;
