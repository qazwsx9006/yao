class HomePageController {
  async home(ctx) {
    const { my } = ctx.query;
    console.log(ctx.query);
    ctx.body = { my, joi: "yes" };
  }
}

module.exports = HomePageController;
