const { Game } = require("@mingyu/lib/models");
const config = require("@mingyu/lib/config");

class HomePageController {
  async form(ctx) {
    const domain = `https://${config.domain}`;
    await ctx.render("homepage/form", {
      params: {
        meta: {
          url: `${domain}`,
        },
        domain,
      },
    });
  }

  async createForm(ctx) {
    console.log(ctx.request.body);

    return { result: "ok" };
  }
}

module.exports = HomePageController;
