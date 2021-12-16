import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import { MONGO_URI, NODE_ENV } from "./utils/config";

import blogsRouter from "./routers/blogsRouter";
import usersRouter from "./routers/authRouter";

mongoose
    .connect(MONGO_URI || "undefined")
    .then(() => {
        console.log("Connected to the DB");
    })
    .catch((err) => {
        console.log("Failed connecting to the DB: " + err.message);
    });

const app = express();

app.use(cors());
app.use(express.json());
if (NODE_ENV !== "test") app.use(morgan("dev"));

app.use("/api/blogs", blogsRouter);
app.use("/users", jsonParser, usersRouter);

export default app;
