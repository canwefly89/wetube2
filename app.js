import express from "express";
// Middlewares start
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// Routes import
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

const app = express();

// Middlewares
app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// [middleware] local 변수 to global 변수
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
