const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const flash = require("connect-flash");
const passport = require("passport");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//initialising
const app = express();
require("./database");
require("./config/passport");

//settings
app.set("view engine", "handlebars");

//
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", ".hbs");
//middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;

  next();
});

//routes
app.use(require("./routes/index"));
app.use(require("./routes/clientes"));
app.use(require("./routes/facturas"));
app.use(require("./routes/users"));

//static files
app.use(express.static(path.join(__dirname, "/public")));

//server is listenning
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
