const express = require("express");
require("dotenv").config();
const morgan = require('morgan');

const app = express();

const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(morgan('dev'));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(methodOverride("_method"));
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(express.static(`${__dirname}/public`));

const database = require("./config/database");
database.connect();

const routes = require("./routes/client/index.route");

routes(app);

app.get("*", (req, res) => {
  res.render("client/pages/error/404", {
    titlePage: "404 Not Found"
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});