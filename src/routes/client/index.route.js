const homeRoutes = require("./home.route");
const cardRoutes = require("./card.route");
const userRoutes = require("./user.route");

const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);

  app.use("/", homeRoutes);
  app.use("/cards", cardRoutes);
  app.use("/users", userRoutes);
};