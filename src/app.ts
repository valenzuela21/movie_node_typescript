import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import {API_ROUTER} from "./routes";
import {dbConnection} from "./config/db";

const app =  express();

dotenv.config({path: ".env"});

const paths = {
    home:       "/",
    auth:       "/api/auth",
    movie:      "/api/movie"
};

dbConnection();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

app.use(
    express.static(path.join(__dirname, "public"))
);


app.use( paths.home, API_ROUTER.homeRouter);
app.use( paths.auth, API_ROUTER.authRouter);
app.use( paths.movie, API_ROUTER.movieRouter);


export default app;


