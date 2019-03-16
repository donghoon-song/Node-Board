const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverried = require("method-override");
const passport = require("passport");
require("dotenv").config();

const pageRouter = require("./routes/page");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");

const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(err => {
    console.log("연결 실패");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(flash());
app.use(methodOverried("_method"));
app.use(passport.initialize()); // req객체에 passport 설정을 심어준다.
app.use(passport.session()); // req.session 객체에 passport 정보를 저장한다. req.session 객체는 express-session에서 생성하니까 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결되어야 한다.

app.use("/", homeRouter);
app.use("auth", authRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
