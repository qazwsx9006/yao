const { Game } = require("@mingyu/lib/models");
const config = require("@mingyu/lib/config");

class HomePageController {
  async home(ctx) {
    const domain = `https://${config.domain}`;
    await ctx.render("homepage/homepage", {
      params: {
        meta: {
          url: `${domain}`,
        },
        domain,
      },
    });
  }
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
    const game = await Game.create(ctx.request.body);
    console.log(game.toJSON());
    ctx.body = { result: "ok" };
  }
}

module.exports = HomePageController;
